package rw.bnr.licensing.dto.response;

import lombok.*;
import rw.bnr.licensing.entity.User;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LoginResponseDTO {
    private String message;
    private boolean success;
    private String token;
    private String username;
    private String telephone;
    private Long id;
    private String displayName;
    private String title;
    private String role;
    private List<String> roles;
}
