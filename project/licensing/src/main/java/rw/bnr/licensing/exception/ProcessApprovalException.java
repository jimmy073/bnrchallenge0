package rw.bnr.licensing.exception;

import rw.bnr.licensing.enums.ApplicationState;

public class ProcessApprovalException extends RuntimeException{
    public ProcessApprovalException(String msg) {
        super(msg);
    }
}
