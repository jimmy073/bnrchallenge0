package rw.bnr.licensing.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CreateApplicationDTO {
   //@NotBlank(message = "Login first")
  // private Long institutionId;
    @NotBlank(message = "Application name is required")
    private String applicationName;
    @NotBlank(message = "Application type is required")
    private String applicationType;
    @NotBlank(message = "description is required")
    private String description;

    @Email(message = "Invalid Email")
    @NotBlank(message = "Email is required")
    private String contactEmail;
    @Pattern(regexp = "^07[0-9]{8}$",
            message = "Phone number must start with 07 and be 10 digits long")
    private String contactPhone;

    private String username;
    private String comment="Processing for next stage";

    private Boolean hasBnrCertificate;
    private Boolean hasRdbRegistration;
    private Boolean hasBusinessPlan;
    private Boolean hasFinancialStatements;

    // attachments fields
}
