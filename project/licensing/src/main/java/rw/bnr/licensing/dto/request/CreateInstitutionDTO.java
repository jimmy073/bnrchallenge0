package rw.bnr.licensing.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CreateInstitutionDTO {
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Abbreviation is required")
    @Size(min = 2, message = "Abbreviation must be at least 8 characters")
    private String abbreviation;
    @NotBlank(message = "TIN is required")
    private String tin;
    @NotBlank(message = "province is required")
    private String province;
    @NotBlank(message = "District is required")
    private String district;
    @NotBlank(message = "Sector is required")
    private String sector;
    @NotBlank(message = "Login first")
    private String username;
}
