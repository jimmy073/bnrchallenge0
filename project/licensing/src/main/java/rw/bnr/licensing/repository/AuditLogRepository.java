package rw.bnr.licensing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rw.bnr.licensing.entity.Application;
import rw.bnr.licensing.entity.AuditLog;
import rw.bnr.licensing.entity.User;
import rw.bnr.licensing.enums.ApplicationState;

import java.util.List;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
}
