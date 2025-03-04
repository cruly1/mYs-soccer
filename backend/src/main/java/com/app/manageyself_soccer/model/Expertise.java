package com.app.manageyself_soccer.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "expertise")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Expertise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "brief_content")
    private String briefContent;

    private String content;

    @ElementCollection
    private Set<String> study = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "expertise_trainers",
            joinColumns = @JoinColumn(name = "expertise_id"),
            inverseJoinColumns = @JoinColumn(name = "trainer_id")
    )
    private Set<Trainer> trainers = new HashSet<>();

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "image_type")
    private String imageType;
}
