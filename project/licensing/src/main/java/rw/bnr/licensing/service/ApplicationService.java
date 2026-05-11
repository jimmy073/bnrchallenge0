package rw.bnr.licensing.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rw.bnr.licensing.dto.request.CreateApplicationDTO;
import rw.bnr.licensing.dto.request.MoveApplicationDTO;
import rw.bnr.licensing.dto.response.ApplicationResponseDTO;
import rw.bnr.licensing.entity.*;
import rw.bnr.licensing.enums.ApplicationState;
import rw.bnr.licensing.enums.StaffAction;
import rw.bnr.licensing.exception.NotFoundException;
import rw.bnr.licensing.exception.UnauthorizedException;
import rw.bnr.licensing.mapper.ApplicationMapper;
import rw.bnr.licensing.repository.ApplicationActionRepository;
import rw.bnr.licensing.repository.ApplicationRepository;
import rw.bnr.licensing.repository.AuditLogRepository;
import rw.bnr.licensing.repository.InstitutionRepository;
import rw.bnr.licensing.statemachine.ApplicationStateMachine;

import java.util.ArrayList;
import java.util.List;

@Service
public class ApplicationService {
    @Autowired private ApplicationRepository applicationRepository;
    @Autowired private UserService userService;
    @Autowired private AuditLogRepository auditLogRepository;
    @Autowired private InstitutionRepository institutionRepository;
    @Autowired private ApplicationActionRepository applicationActionRepository;
    @Autowired private ApplicationStateMachine workflowEngine;
    @Autowired private DocumentService documentService;

    @Transactional
    public ApplicationResponseDTO createApplication(CreateApplicationDTO dto){
        User loggedInUser = userService.getLoggedInUser(dto.getUsername());
        Institution institution  = loggedInUser.getInstitution();

        if(!loggedInUser.getRole().getName().equals("ROLE_APPLICANT")){
            throw new UnauthorizedException("You are not allowed to create an Application");
        }

        Application application = ApplicationMapper.fromDTO(dto);
        application.setState(ApplicationState.DRAFT);
        application.setCreatedBy(dto.getUsername());
        if(institution!=null){
            application.setInstitution(institution);
        }

        Application newApplication = applicationRepository.save(application);
        saveApplicationActionAndLogs(loggedInUser, newApplication, ApplicationState.DRAFT, ApplicationState.DRAFT, dto.getComment());
        return ApplicationMapper.toResponseDTO(newApplication);
    }

    @Transactional
    public ApplicationResponseDTO submitApplication(MoveApplicationDTO dto){
        User loggedInUser = userService.getLoggedInUser(dto.getUsername());
        Institution institution  = loggedInUser.getInstitution();
        Application submittedApp = currentApplication(dto.getApplicationId());
        ApplicationState oldState = submittedApp.getState();

        StaffAction actionTobeDone = StaffAction.valueOf(dto.getNewState());

        if(!submittedApp.getInstitution().getId().equals(institution.getId()) ||
        loggedInUser.getInstitution() == null) {
            throw new UnauthorizedException("You are not allowed to work on this application");
        }

        Application updatedApp =   workflowEngine.movingToNextStage(submittedApp,actionTobeDone, loggedInUser);

        saveApplicationActionAndLogs(loggedInUser, submittedApp, oldState, updatedApp.getState(), dto.getComment());

        return ApplicationMapper.toResponseDTO(updatedApp);

    }

    @Transactional
    public ApplicationResponseDTO approveApplication(MoveApplicationDTO dto){

        User loggedInUser = userService.getLoggedInUser(dto.getUsername());
        Institution institution  = loggedInUser.getInstitution();
        Application submittedApp = currentApplication(dto.getApplicationId());
        ApplicationState oldState = submittedApp.getState();
        System.out.println("ARRIVED HERE::::: JJ");
        StaffAction actionTobeDone = StaffAction.valueOf(dto.getNewState());

        if(loggedInUser.getRole().getName().equals("ROLE_APPLICANT")) {
            throw new UnauthorizedException("Unauthorized access");
        }

        Application updatedApp =   workflowEngine.movingToNextStage(submittedApp,actionTobeDone, loggedInUser);

        saveApplicationActionAndLogs(loggedInUser, submittedApp, oldState, updatedApp.getState(), dto.getComment());

        return ApplicationMapper.toResponseDTO(updatedApp);


    }


    @Transactional
    public ApplicationResponseDTO createApplicationV2(
            String appdto,
            List<MultipartFile> files
    ) throws JsonProcessingException {
        CreateApplicationDTO dto = ApplicationMapper.makeCreateApplicationDTO(appdto);
        User loggedInUser = userService.getLoggedInUser(dto.getUsername());
        Institution institution  = loggedInUser.getInstitution();

        if(!loggedInUser.getRole().getName().equals("ROLE_APPLICANT")){
            throw new UnauthorizedException("You are not allowed to create an Application");
        }

        Application application = ApplicationMapper.fromDTO(dto);
        application.setState(ApplicationState.DRAFT);
        application.setCreatedBy(dto.getUsername());
        if(institution!=null){
            application.setInstitution(institution);
        }
        Application newAppWithNoRef = applicationRepository.save(application);
        newAppWithNoRef.setReferenceNumber(makeReference(newAppWithNoRef.getId()));
        Application newApplication = applicationRepository.save(newAppWithNoRef);
        saveApplicationActionAndLogs(loggedInUser, newApplication, ApplicationState.DRAFT, ApplicationState.DRAFT, dto.getComment());


        for (MultipartFile file : files) {
            documentService.upload(
                    newApplication,
                    file, loggedInUser
            );
        }

        return ApplicationMapper.toResponseDTO(newApplication);
    }

    public Application currentApplication(Long id){
        return applicationRepository.findById(id).orElseThrow(
                ()-> new NotFoundException("Application Not found")
        );
    }
    public void saveApplicationActionAndLogs(User loggedInUser,Application application, ApplicationState oldState, ApplicationState newState, String comment){
        ApplicationAction appAction = new ApplicationAction();
        appAction.setUser(loggedInUser);
        appAction.setApplication(application);
        appAction.setActionState(newState);
        appAction.setComment(comment);
        applicationActionRepository.save(appAction);

        AuditLog auditLog = new AuditLog();
        auditLog.setApplication(application);
        auditLog.setAction(String.valueOf(application.getState()));
        auditLog.setActedBy(loggedInUser);
        auditLog.setNewState(newState);
        auditLog.setOldState(oldState);
        auditLogRepository.save(auditLog);
    }

    public String makeReference(Long id){
        Long fig = 100000+id;
        return "REF"+String.valueOf(fig).substring(1);
    }

    public List<ApplicationResponseDTO> getAllApplications(){
        return applicationRepository.findAll()
                .stream()
                .map(ApplicationMapper::toResponseDTO)
                .toList();
    }

    public List<ApplicationResponseDTO> getAllApplicationsByRole(String role){
   System.out.println("ROLE: "+role);
        if(role.equals("ROLE_REVIEWER")){
            return applicationRepository.findByStateIn(List.of(
                            ApplicationState.SUBMITTED,
                            ApplicationState.RESUBMITTED,
                            ApplicationState.UNDER_REVIEW
                    ))
                    .stream()
                    .map(ApplicationMapper::toResponseDTO)
                    .toList();
        }
        if(role.equals("ROLE_VERIFIER")){
            return applicationRepository.findByStateIn(List.of(
                            ApplicationState.REVIEWED
                    ))
                    .stream()
                    .map(ApplicationMapper::toResponseDTO)
                    .toList();
        }
        if(role.equals("ROLE_APPROVER")){
            return applicationRepository.findByStateIn(List.of(
                            ApplicationState.VERIFIED
                    ))
                    .stream()
                    .map(ApplicationMapper::toResponseDTO)
                    .toList();
        }

    return new ArrayList<ApplicationResponseDTO>();
    }

    public ApplicationResponseDTO getOneApplications(Long id){
        return applicationRepository.findById(id)
                .map(ApplicationMapper::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("Application not found"));
    }

}
