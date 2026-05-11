package rw.bnr.licensing.entity;

import jakarta.persistence.*;
import lombok.*;
import rw.bnr.licensing.enums.ApplicationState;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String referenceNumber;

    private Long institutionPK;
    private String applicationName;
    private String applicationType;
    private String description;
    private String contactEmail;
    private String contactPhone;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ApplicationState state;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    @ManyToOne
    private Institution institution;

    // ABOVE FIELDS ARE IMPLEMENTED

    @OneToMany(mappedBy = "application")
    private List<ApplicationAction> applicationActions;
    @Version
    private Long version;
    @OneToMany(mappedBy = "application", fetch = FetchType.LAZY)
    private List<ApplicationDocument> documentList;

    @OneToOne
    @JoinColumn(name = "audit_log_id")
    private AuditLog auditLog;



    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}
