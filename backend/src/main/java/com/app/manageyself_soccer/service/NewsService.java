package com.app.manageyself_soccer.service;

import com.app.manageyself_soccer.dao.NewsRepository;
import com.app.manageyself_soccer.dto.NewsDTO;
import com.app.manageyself_soccer.exception.customexceptions.NewsNotFoundException;
import com.app.manageyself_soccer.mapper.NewsMapper;
import com.app.manageyself_soccer.model.News;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsRepository newsRepository;
    private final NewsMapper newsMapper;

    private static final String newsNotFound = "News not found.";

    public NewsDTO getNewsByTitle(String title) {
        News news = newsRepository.findByTitle(title)
                .orElseThrow(() -> new NewsNotFoundException(newsNotFound));

        return newsMapper.toNewsDTO(news);
    }

    public List<NewsDTO> getAllNews() {
        List<News> news = newsRepository.findAll();
        return news.stream().map(newsMapper::toNewsDTO).toList();
    }

    public List<NewsDTO> getFirstFourNews() {
        List<News> news = newsRepository.findTop4ByOrderByPostDateDesc();
        return news.stream().map(newsMapper::toNewsDTO).toList();
    }

    public NewsDTO addNews(NewsDTO newsDTO) {
        News news = newsMapper.toNews(newsDTO);
        newsRepository.save(news);
        return newsDTO;
    }

    public NewsDTO updateNews(String title, NewsDTO newsDTO) {
        News news = newsRepository.findByTitle(title)
                .orElseThrow(() -> new NewsNotFoundException(newsNotFound));

        news.setTitle(newsDTO.getTitle());
        news.setPostDate(newsDTO.getPostDate());
        news.setBriefContent(newsDTO.getBriefContent());
        news.setContent(newsDTO.getContent());

        newsRepository.save(news);

        return newsDTO;
    }

    public String deleteNews(String title) {
        News news = newsRepository.findByTitle(title)
                .orElseThrow(() -> new NewsNotFoundException(newsNotFound));

        newsRepository.delete(news);

        return "News deleted.";
    }
}
