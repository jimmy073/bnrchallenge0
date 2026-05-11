package rw.bnr.licensing.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ErrorResponseDTO {
    private String message;
    private int status;
    private String path;
}
