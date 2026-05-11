package rw.bnr.licensing.entity;

import jakarta.persistence.*;
import lombok.*;
import rw.bnr.licensing.enums.UserStatus;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class User {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String email;
    private String password;
    @ManyToOne(fetch = FetchType.LAZY)
    private Role role;

    @Column(unique = true)
    private String nationalId;
    @Column(unique = true)
    private String telephone;
    private String title;

    @Enumerated(EnumType.STRING)
    private UserStatus status;
    private boolean loggedIn;

    @ManyToOne
    private Institution institution;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<ApplicationAction> applicationActions;
    @OneToMany(mappedBy = "uploadedBy", fetch = FetchType.LAZY)
    private List<ApplicationDocument> documentList;
    @OneToMany(mappedBy = "actedBy", fetch = FetchType.LAZY)
    private List<AuditLog> actionDoneList;
}
