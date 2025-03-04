package com.app.manageyself_soccer.mapper;

import com.app.manageyself_soccer.dto.NewsDTO;
import com.app.manageyself_soccer.model.News;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NewsMapper {

    NewsDTO toNewsDTO(News news);
    News toNews(NewsDTO newsDTO);

}
