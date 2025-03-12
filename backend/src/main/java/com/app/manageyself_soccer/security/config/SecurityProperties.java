package com.app.manageyself_soccer.security.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "application.security.jwt")
public class SecurityProperties {
    private List<String> userEndpoints;
    private List<String> adminEndpoints;
}
