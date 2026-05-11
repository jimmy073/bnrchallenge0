package rw.bnr.licensing.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CreateUserDTO {

    private Long id;
    @NotBlank(message = "First Name is required")
    private String firstName;
    @NotBlank(message = "Last Name is required")
    private String lastName;
    @Pattern(regexp = "^07[0-9]{8}$",
            message = "Phone number must start with 07 and be 10 digits long")
    private String telephone;
    @Email(message = "Invalid email format")
    @NotBlank(message = "Username is required")
    private String email;
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    private String status;

    @NotBlank(message = "National ID is required")
    @Pattern(regexp = "^[0-9]{16}$",
            message = "National Id must be 16 digits long")
    private String nationalId;

}
