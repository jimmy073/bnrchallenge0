package rw.bnr.licensing.mapper;

import rw.bnr.licensing.dto.request.CreateInstitutionDTO;
import rw.bnr.licensing.dto.response.InstitutionResponseDTO;
import rw.bnr.licensing.dto.response.UserDTO;
import rw.bnr.licensing.entity.Institution;
import rw.bnr.licensing.entity.User;

public class InstitutionMapper {
    public static Institution fromReqDTO(CreateInstitutionDTO dto) {
        Institution inst = new Institution();
        inst.setAbbreviation(dto.getAbbreviation());
        inst.setName(dto.getName());
        inst.setTin(dto.getTin());
        inst.setCreatedBy(dto.getUsername());
        inst.setLocation(dto.getProvince()+" "+dto.getDistrict()+" "+dto.getSector());
        return inst;

    }

    public static InstitutionResponseDTO toResponseDTO(Institution toDto) {
        InstitutionResponseDTO inst = new InstitutionResponseDTO();
        inst.setAbbreviation(toDto.getAbbreviation());
        inst.setName(toDto.getName());
        inst.setTin(toDto.getTin());
        // implement this to take province, District and sector
       // inst.setLocation(dto.getProvince()+" "+dto.getDistrict()+" "+dto.getSector());
        return inst;

    }
}
