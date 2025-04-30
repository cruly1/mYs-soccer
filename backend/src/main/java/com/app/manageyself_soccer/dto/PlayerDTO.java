package com.app.manageyself_soccer.dto;

import com.app.manageyself_soccer.model.enums.Leg;
import com.app.manageyself_soccer.model.enums.Position;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlayerDTO {
    private String name;
    private LocalDate dateOfBirth;
    private int age;
    private String placeOfBirth;
    private Short heightInCm;
    private Short weightInKg;
    private String slogan;
    private Leg leg;
    private String team;
    private Position position;
    private String imageName;
    private String imageType;
}
