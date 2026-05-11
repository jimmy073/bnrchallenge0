package rw.bnr.licensing;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import rw.bnr.licensing.entity.Application;
import rw.bnr.licensing.entity.Role;
import rw.bnr.licensing.entity.User;
import rw.bnr.licensing.enums.ApplicationState;
import rw.bnr.licensing.enums.StaffAction;
import rw.bnr.licensing.exception.InvalidWorkflowException;
import rw.bnr.licensing.exception.ProcessApprovalException;
import rw.bnr.licensing.repository.ApplicationActionRepository;
import rw.bnr.licensing.statemachine.ApplicationStateMachine;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ApplicationStateMachineTest {

    @Mock
    private ApplicationActionRepository applicationActionRepository;

    @InjectMocks
    private ApplicationStateMachine stateMachine;

    private User applicantUser() {
        User user = new User();
        Role role = new Role();
        role.setName("ROLE_APPLICANT");
        user.setRole(role);
        return user;
    }

    @BeforeEach
    void setup() {
        when(applicationActionRepository.existsByApplicationAndUserAndActionStateIn(
                any(), any(), anyList()
        )).thenReturn(false);
    }

    @Test
    void applicant_can_submit_from_draft() {

        Application app = new Application();
        app.setState(ApplicationState.DRAFT);

        Application result = stateMachine.movingToNextStage(
                app,
                StaffAction.SUBMIT,
                applicantUser()
        );

        assertEquals(ApplicationState.SUBMITTED, result.getState());
    }

    @Test
    void invalid_transition_should_throw_exception() {

        Application app = new Application();
        app.setState(ApplicationState.DRAFT);

        User reviewer = new User();
        Role role = new Role();
        role.setName("ROLE_REVIEWER");
        reviewer.setRole(role);

        assertThrows(InvalidWorkflowException.class,
                () -> stateMachine.movingToNextStage(
                        app,
                        StaffAction.START_REVIEW,
                        reviewer
                ));
    }

    @Test
    void terminal_state_should_not_allow_transition() {

        Application app = new Application();
        app.setState(ApplicationState.APPROVED);

        User reviewer = new User();
        Role role = new Role();
        role.setName("ROLE_REVIEWER");
        reviewer.setRole(role);

        assertThrows(ProcessApprovalException.class,
                () -> stateMachine.movingToNextStage(
                        app,
                        StaffAction.SUBMIT,
                        reviewer
                ));
    }
}