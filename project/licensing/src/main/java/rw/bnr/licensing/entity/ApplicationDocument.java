package rw.bnr.licensing.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ApplicationDocument {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private Application application;
    private String fileName;
    private String storedFileName;
    private String filePath;
    private String contentType;
    private Long size;
    @Version
    private Long version;

    @ManyToOne(fetch = FetchType.LAZY)
    private User uploadedBy;
    private LocalDateTime createdAt;
    private String mimeType;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
