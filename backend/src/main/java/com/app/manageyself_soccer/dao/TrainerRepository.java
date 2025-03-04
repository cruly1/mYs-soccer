package com.app.manageyself_soccer.dao;

import com.app.manageyself_soccer.model.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {
    Optional<Trainer> findByName(String name);
    void deleteByName(String name);
}
