package rw.bnr.licensing.dto.response;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import rw.bnr.licensing.entity.ApplicationAction;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ApplicationResponseDTO {
    private String applicationName;
    private String applicationType;
    private String description;
    private String contactEmail;
    private String contactPhone;
    private String createdBy;
    private String institution;
    private String state;
    private LocalDateTime createdAt;
    private String reference;
    private Long id;
   // private List<ApplicationAction> actionsDone;



    private Boolean hasBnrCertificate;
    private Boolean hasRdbRegistration;
    private Boolean hasBusinessPlan;
    private Boolean hasFinancialStatements;

    // attachments fields work on them
}
