package com.app.manageyself_soccer.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsDTO {
    private String title;
    private LocalDate postDate;
    private String briefContent;
    private String content;
    private String imageName;
    private String imageType;
}
