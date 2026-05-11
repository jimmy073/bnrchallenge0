package rw.bnr.licensing.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import rw.bnr.licensing.enums.ApplicationState;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MoveApplicationDTO {
    @NotBlank(message = "Login first")
    private String username;
    @NotBlank(message = "Select at least One Action")
    private String newState;
    @NotNull
    private Long applicationId;
    private String comment;
}
