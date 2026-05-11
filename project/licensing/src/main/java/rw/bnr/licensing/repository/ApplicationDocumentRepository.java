package rw.bnr.licensing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rw.bnr.licensing.entity.ApplicationDocument;

public interface ApplicationDocumentRepository extends JpaRepository<ApplicationDocument, Long> {
}
