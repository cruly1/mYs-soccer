package com.app.manageyself_soccer.dao;

import com.app.manageyself_soccer.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    Optional<News> findByTitle(String title);
    List<News> findTop4ByOrderByPostDateDesc();
}
