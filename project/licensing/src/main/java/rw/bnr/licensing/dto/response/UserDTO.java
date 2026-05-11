package rw.bnr.licensing.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String telephone;
    private String email;
    private String nationalId;
    private boolean loggedIn;
    private String roleName;
    private String status;

}
