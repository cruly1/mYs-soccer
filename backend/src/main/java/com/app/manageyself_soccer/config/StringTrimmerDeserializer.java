package com.app.manageyself_soccer.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import lombok.SneakyThrows;

public class StringTrimmerDeserializer extends JsonDeserializer<String> {

    @SneakyThrows
    @Override
    public String deserialize(JsonParser p, DeserializationContext ctxt) {
        String value = p.getValueAsString();
        return (value == null) ? null : value.trim();
    }
}
