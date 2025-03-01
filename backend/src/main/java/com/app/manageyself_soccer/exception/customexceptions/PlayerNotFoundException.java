package com.app.manageyself_soccer.exception.customexceptions;

public class PlayerNotFoundException extends RuntimeException {

    public PlayerNotFoundException(String message) {
        super(message);
    }
}
