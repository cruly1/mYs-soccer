package com.app.manageyself_soccer.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsDTO {
    private String title;
    private LocalDateTime postDate;
    private String briefContent;
    private String content;
    private String imageName;
    private String imageType;
}
