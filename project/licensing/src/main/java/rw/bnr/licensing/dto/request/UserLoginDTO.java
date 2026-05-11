package rw.bnr.licensing.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserLoginDTO {
    @Email(message = "Invalid username")
    @NotBlank(message = "Username is required")
    private String email;
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

}
