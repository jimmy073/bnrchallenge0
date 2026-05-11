package rw.bnr.licensing.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import rw.bnr.licensing.dto.request.CreateApplicationDTO;
import rw.bnr.licensing.dto.request.CreateInstitutionDTO;
import rw.bnr.licensing.dto.request.GenericRequestDTO;
import rw.bnr.licensing.dto.request.MoveApplicationDTO;
import rw.bnr.licensing.dto.response.ApplicationResponseDTO;
import rw.bnr.licensing.dto.response.InstitutionResponseDTO;
import rw.bnr.licensing.entity.Application;
import rw.bnr.licensing.service.ApplicationService;
import rw.bnr.licensing.service.InstitutionService;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {
    @Autowired private InstitutionService institutionService;
    @Autowired private ApplicationService applicationService;

    @PostMapping("/create-institution")
    public InstitutionResponseDTO createInstitution(@Valid @RequestBody CreateInstitutionDTO dto){
        return institutionService.createInstitution(dto);
    }

    @PostMapping("/create-application")
    public ApplicationResponseDTO createApplication(@Valid @RequestBody CreateApplicationDTO dto){
        return applicationService.createApplication(dto);
    }

    @PutMapping("/submit-application")
    public ApplicationResponseDTO submitApplication(@Valid @RequestBody MoveApplicationDTO dto){
        return applicationService.submitApplication(dto);
    }

    @PutMapping("/approve-application")
    public ApplicationResponseDTO approveApplication(@Valid @RequestBody MoveApplicationDTO dto){
        return applicationService.approveApplication(dto);
    }

    @PostMapping(value = "/create-application-v2",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void createApplicationV2(

            @Valid @RequestPart("application")
            String dto,

            @RequestPart("files")
            List<MultipartFile> files
    ) throws JsonProcessingException {
        applicationService.createApplicationV2(dto,files);
    }

    @GetMapping("/applications")
    public List<ApplicationResponseDTO> getAllApplications(){
        return applicationService.getAllApplications();
    }

    @GetMapping("/applications/role")
    public List<ApplicationResponseDTO> getAllApplicationsByRole(@RequestParam String role){
        return applicationService.getAllApplicationsByRole(role);
    }

    @GetMapping("/applications/find/{id}")
    public ApplicationResponseDTO getOneApplications(@PathVariable Long id){
        return applicationService.getOneApplications(id);
    }
}
