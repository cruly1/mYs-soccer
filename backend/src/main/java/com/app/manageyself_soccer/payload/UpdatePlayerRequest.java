package com.app.manageyself_soccer.payload;

import com.app.manageyself_soccer.model.enums.Leg;
import com.app.manageyself_soccer.model.enums.Position;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdatePlayerRequest {
    private String name;
    private LocalDate dateOfBirth;
    private String placeOfBirth;
    private Short heightInCm;
    private Short weightInKg;
    private String slogan;
    private Leg leg;
    private String team;
    private Position position;
}
