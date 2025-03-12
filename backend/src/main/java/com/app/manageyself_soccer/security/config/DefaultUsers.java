package com.app.manageyself_soccer.security.config;

import com.app.manageyself_soccer.dao.UserRepository;
import com.app.manageyself_soccer.model.User;
import com.app.manageyself_soccer.model.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DefaultUsers {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public User createAdmin() {
        User user = User.builder()
                .username("admin")
                .password(passwordEncoder.encode("Admin1234."))
                .role(Role.ADMIN)
                .build();

        return userRepository.save(user);
    }
}
