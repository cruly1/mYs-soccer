package com.app.manageyself_soccer.exception.customexceptions;

public class NewsNotFoundException extends RuntimeException {
    public NewsNotFoundException(String message) {
        super(message);
    }
}
