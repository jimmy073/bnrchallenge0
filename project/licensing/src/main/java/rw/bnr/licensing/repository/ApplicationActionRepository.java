package rw.bnr.licensing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rw.bnr.licensing.entity.Application;
import rw.bnr.licensing.entity.ApplicationAction;
import rw.bnr.licensing.entity.User;
import rw.bnr.licensing.enums.ApplicationState;

import java.util.List;

public interface ApplicationActionRepository extends JpaRepository<ApplicationAction, Long> {
    boolean existsByApplicationAndUserAndActionStateIn(
            Application application,
            User loggedInUser,
            List<ApplicationState> actions);
}
