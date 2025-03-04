package com.app.manageyself_soccer.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "trainers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Trainer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "brief_content")
    private String briefContent;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "image_type")
    private String imageType;
}
