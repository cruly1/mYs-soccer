package com.app.manageyself_soccer.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TrainerDTO {
    private String name;
    private String briefContent;
    private String imageName;
    private String imageType;
}
