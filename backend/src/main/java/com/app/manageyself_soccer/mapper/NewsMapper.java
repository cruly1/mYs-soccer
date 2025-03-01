package com.app.manageyself_soccer.mapper;

import com.app.manageyself_soccer.dto.NewsDTO;
import com.app.manageyself_soccer.model.News;
import org.springframework.stereotype.Component;

@Component
public class NewsMapper {

    public NewsDTO toDTO(News news) {
        return NewsDTO.builder()
                .title(news.getTitle())
                .postDate(news.getPostDate())
                .briefContent(news.getBriefContent())
                .content(news.getContent())
                .imageName(news.getImageName())
                .imageType(news.getImageType())
                .build();
    }

    public News toEntity(NewsDTO newsDTO) {
        return News.builder()
                .title(newsDTO.getTitle())
                .postDate(newsDTO.getPostDate())
                .briefContent(newsDTO.getBriefContent())
                .content(newsDTO.getContent())
                .imageName(newsDTO.getImageName())
                .imageType(newsDTO.getImageType())
                .build();
    }
}
