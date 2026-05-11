package rw.bnr.licensing.dto.response;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class InstitutionResponseDTO {
    private String name;
    private String abbreviation;
    private String tin;
    private String province;
    private String district;
    private String sector;
}
