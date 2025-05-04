package com.app.manageyself_soccer.config;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public Module stringTrimModule() {
        SimpleModule module = new SimpleModule();
        module.addDeserializer(String.class, new StringTrimmerDeserializer());
        return module;
    }
}
