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
public class AuditLog {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(mappedBy = "auditLog", fetch = FetchType.LAZY)
    private Application application;
    private String action;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ApplicationState oldState;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ApplicationState newState;
    @ManyToOne(fetch = FetchType.LAZY)
    private User actedBy;
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
