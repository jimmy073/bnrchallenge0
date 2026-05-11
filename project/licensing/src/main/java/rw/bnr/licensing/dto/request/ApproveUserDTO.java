package rw.bnr.licensing.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ApproveUserDTO {
    @Email(message = "Invalid email format")
    @NotBlank(message = "Username is required")
    private String username;
}
