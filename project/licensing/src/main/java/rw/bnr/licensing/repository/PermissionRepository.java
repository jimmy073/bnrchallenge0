package rw.bnr.licensing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rw.bnr.licensing.entity.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
}
