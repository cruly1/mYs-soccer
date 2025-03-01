package com.app.manageyself_soccer.dto;

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
    private Position position;
    private String imageName;
    private String imageType;
}
