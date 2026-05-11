package rw.bnr.licensing.statemachine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import rw.bnr.licensing.entity.Application;
import rw.bnr.licensing.entity.User;
import rw.bnr.licensing.enums.ApplicationState;
import rw.bnr.licensing.enums.StaffAction;
import rw.bnr.licensing.exception.InvalidWorkflowException;
import rw.bnr.licensing.exception.ProcessApprovalException;
import rw.bnr.licensing.repository.ApplicationActionRepository;

import java.util.List;

@Component
public class ApplicationStateMachine {
    @Autowired private ApplicationActionRepository applicationActionRepository;
    //TODO CHECK if we need to return something and rename the function
    public Application movingToNextStage(
            Application application,
            StaffAction action,
            User loggedInUser
    ) {
        validateApproval(loggedInUser, application);

        ApplicationState currentState = application.getState();

        if (!isUserAllowedToMoveApplication(currentState, action, loggedInUser)) {
            throw new InvalidWorkflowException("Moving application to next stage not allowed");
        }

        ApplicationState nextState = getNextState(currentState, action);
        application.setState(nextState);
        return application;
    }

    private boolean isUserAllowedToMoveApplication(
            ApplicationState currentState,
            StaffAction action,
            User loggedInUser
    ) {
        // validate state + role + business rules
        // check if logged in user has rights to do an action
        if (loggedInUser.getRole().getName().equals("ROLE_APPLICANT")) {
            if (currentState == ApplicationState.DRAFT
                    && action == StaffAction.SUBMIT) {
                return true;
            }
            if (currentState == ApplicationState.INFO_REQUESTED
                    && action == StaffAction.RESUBMIT) {
                return true;
            }

            return false;
        }

        if (loggedInUser.getRole().getName().equals("ROLE_REVIEWER")) {

            if (currentState == ApplicationState.SUBMITTED
                    && action == StaffAction.START_REVIEW) {
                return true;
            }

            if (currentState == ApplicationState.UNDER_REVIEW
                    && (action == StaffAction.COMPLETE_REVIEW
                    || action == StaffAction.REQUEST_INFO
                    || action == StaffAction.REJECT)) {
                return true;
            }

            return false;
        }

        if (loggedInUser.getRole().getName().equals("ROLE_VERIFIER")) {

            if (currentState == ApplicationState.REVIEWED
                    && action == StaffAction.VERIFY) {
                return true;
            }

            if (action == StaffAction.REQUEST_INFO
                    || action == StaffAction.REJECT) {
                return true;
            }

            return false;
        }

        if (loggedInUser.getRole().getName().equals("ROLE_APPROVER")) {

            if (currentState == ApplicationState.VERIFIED
                    && action == StaffAction.APPROVE) {
                return true;
            }

            if (currentState == ApplicationState.VERIFIED
                    && action == StaffAction.REJECT) {
                return true;
            }

            return false;
        }

        return false;
    }

    // Made this function with the purpose of receiving current state and action done,
    // to have possible next state to avoid, jumping some state or redoing the same state
    private ApplicationState getNextState(
            ApplicationState currentState,
            StaffAction action
    ) {
        return switch (currentState) {

            case DRAFT -> {

                if (action == StaffAction.SUBMIT) {
                    yield ApplicationState.SUBMITTED;
                }

                //TODO think about adding when application is canceled

                throw new ProcessApprovalException(
                        "Invalid action for DRAFT state"
                );
            }

            case SUBMITTED -> {

                if (action == StaffAction.START_REVIEW) {
                    yield ApplicationState.UNDER_REVIEW;
                }

                throw new ProcessApprovalException(
                        "Invalid action for SUBMITTED state"
                );
            }

            case UNDER_REVIEW -> {
                if(action == StaffAction.REQUEST_INFO){
                    yield ApplicationState.INFO_REQUESTED;
                }

                if(action == StaffAction.COMPLETE_REVIEW){
                    yield ApplicationState.REVIEWED;
                }

                if(action == StaffAction.REJECT){
                    yield ApplicationState.REJECTED;
                }

                throw new ProcessApprovalException(
                        "Invalid action for Under Review State"
                );

            }

            case INFO_REQUESTED -> {

                if (action == StaffAction.RESUBMIT) {
                    yield ApplicationState.RESUBMITTED;
                }

                throw new ProcessApprovalException(
                        "Invalid action for Requesting info state"
                );
            }

            case RESUBMITTED -> {

                if (action == StaffAction.START_REVIEW) {
                    yield ApplicationState.UNDER_REVIEW;
                }

                throw new ProcessApprovalException(
                        "Invalid action for Resubmitted"
                );
            }

            case REVIEWED -> {

                if (action == StaffAction.VERIFY) {
                    yield ApplicationState.VERIFIED;
                }

                if(action == StaffAction.REQUEST_INFO){
                    yield ApplicationState.INFO_REQUESTED;
                }

                if(action == StaffAction.REJECT){
                    yield ApplicationState.REJECTED;
                }

                throw new ProcessApprovalException(
                        "Invalid next action for Reviewed state"
                );
            }

            case VERIFIED -> {

                if(action == StaffAction.APPROVE){
                    yield ApplicationState.APPROVED;
                }

                if(action == StaffAction.REJECT){
                    yield ApplicationState.REJECTED;
                }

                throw new ProcessApprovalException(
                                    "Invalid action for verified stage"
                            );
            }

            case APPROVED, REJECTED ->
                    throw new ProcessApprovalException(
                            "Terminal state cannot have next stage"
                    );
        };
    }

    public void validateApproval(User loggedInUser, Application app) {
        // Checking if a user have worked on application before approve
        boolean alreadyProcessed =
                applicationActionRepository.existsByApplicationAndUserAndActionStateIn(app, loggedInUser, List.of(ApplicationState.REVIEWED, ApplicationState.VERIFIED, ApplicationState.INFO_REQUESTED));
        if (alreadyProcessed) {
            throw new ProcessApprovalException("User can not approve application they have reviewed or verified");
        }
    }
}
