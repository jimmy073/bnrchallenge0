package rw.bnr.licensing.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import rw.bnr.licensing.dto.request.CreateApplicationDTO;
import rw.bnr.licensing.dto.response.ApplicationResponseDTO;
import rw.bnr.licensing.entity.Application;

public class ApplicationMapper {
    public static Application fromDTO(CreateApplicationDTO dto){
        Application app = new Application();
        app.setApplicationName(dto.getApplicationName());
        app.setApplicationType(dto.getApplicationType());
        app.setDescription(dto.getDescription());
        app.setContactEmail(dto.getContactEmail());
        app.setContactPhone(dto.getContactPhone());

       // app.setInstitutionPK(dto.getInstitutionId());
        return app;
    }

    public static ApplicationResponseDTO toResponseDTO(Application toDto){
        ApplicationResponseDTO app = new ApplicationResponseDTO();
        app.setApplicationName(toDto.getApplicationName());
        app.setApplicationType(toDto.getApplicationType());
        app.setDescription(toDto.getDescription());
        app.setContactEmail(toDto.getContactEmail());
        app.setContactPhone(toDto.getContactPhone());
        app.setInstitution(toDto.getInstitution().getName());
        app.setCreatedBy(toDto.getCreatedBy());
        app.setState(String.valueOf(toDto.getState()));
        app.setReference(toDto.getReferenceNumber());
        app.setId(toDto.getId());
        //app.setActionsDone(toDto.getApplicationActions());
        app.setCreatedAt(toDto.getCreatedAt());
        return app;
    }

    public static CreateApplicationDTO makeCreateApplicationDTO(String dto) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(dto);
        CreateApplicationDTO theDTO =
                mapper.readValue(dto, CreateApplicationDTO.class);
        return theDTO;
    }

}
