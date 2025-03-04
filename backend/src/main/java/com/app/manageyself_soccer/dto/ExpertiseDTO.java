package com.app.manageyself_soccer.dto;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExpertiseDTO {
    private String title;
    private String briefContent;
    private String content;
    private Set<String> study = new HashSet<>();
    private Set<TrainerDTO> trainers = new HashSet<>();
    private String imageName;
    private String imageType;
}
