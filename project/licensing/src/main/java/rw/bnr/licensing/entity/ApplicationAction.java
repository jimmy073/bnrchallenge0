package rw.bnr.licensing.entity;

import jakarta.persistence.*;
import lombok.*;
import rw.bnr.licensing.enums.ApplicationState;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ApplicationAction {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private Application application;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    @Enumerated(EnumType.STRING)
    private ApplicationState actionState;
    private LocalDateTime createdAt;

    //TODO work on the way to get this comment from the user
    private String comment;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
