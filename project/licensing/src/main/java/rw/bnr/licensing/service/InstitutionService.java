package rw.bnr.licensing.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rw.bnr.licensing.dto.request.CreateInstitutionDTO;
import rw.bnr.licensing.dto.response.InstitutionResponseDTO;
import rw.bnr.licensing.entity.Institution;
import rw.bnr.licensing.entity.User;
import rw.bnr.licensing.exception.DuplicateKeyException;
import rw.bnr.licensing.mapper.InstitutionMapper;
import rw.bnr.licensing.repository.InstitutionRepository;

@Service
public class InstitutionService {
    @Autowired
    private InstitutionRepository institutionRepository;
    @Autowired private UserService userService;

    public InstitutionResponseDTO createInstitution(CreateInstitutionDTO dto){
        if(institutionRepository.existsByName(dto.getName())){
            throw new DuplicateKeyException("Institution name taken");
        }
        if(institutionRepository.existsByAbbreviation(dto.getName())){
            throw new DuplicateKeyException("Abbreviation name taken");
        }
        if(institutionRepository.existsByTin(dto.getName())){
            throw new DuplicateKeyException("TIN has been used");
        }

        Institution inst = institutionRepository.save(InstitutionMapper.fromReqDTO(dto));
        InstitutionResponseDTO newInstitution;
        newInstitution = InstitutionMapper.toResponseDTO(inst);

        // Checking the logged in user and assign created institution as their institution
        User loggedInUser = userService.getLoggedInUser(dto.getUsername());
        if(loggedInUser.getInstitution() == null){
            loggedInUser.setInstitution(inst);
            userService.updateUser(loggedInUser);
        }

        return newInstitution;

    }
}
