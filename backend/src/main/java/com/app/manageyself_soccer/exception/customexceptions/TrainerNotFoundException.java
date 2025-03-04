package com.app.manageyself_soccer.exception.customexceptions;

public class TrainerNotFoundException extends RuntimeException {
    public TrainerNotFoundException(String message) {
        super(message);
    }
}
