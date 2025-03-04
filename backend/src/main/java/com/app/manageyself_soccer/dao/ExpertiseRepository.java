package com.app.manageyself_soccer.dao;

import com.app.manageyself_soccer.model.Expertise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExpertiseRepository extends JpaRepository<Expertise, Long> {
    Optional<Expertise> findByTitle(String title);
}
