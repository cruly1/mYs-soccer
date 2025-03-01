package com.app.manageyself_soccer.controller;

import com.app.manageyself_soccer.dto.NewsDTO;
import com.app.manageyself_soccer.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("localhost:3000")
@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;

    @GetMapping("/getNewsByTitle")
    public ResponseEntity<NewsDTO> getNewsByTitle(@RequestParam String title) {
        NewsDTO news = newsService.getNewsByTitle(title);
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    @GetMapping("/getAllNews")
    public ResponseEntity<List<NewsDTO>> getAllNews() {
        List<NewsDTO> news = newsService.getAllNews();
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    @GetMapping("/getFirstFourNews")
    public ResponseEntity<List<NewsDTO>> getFirstFourNews() {
        List<NewsDTO> news = newsService.getFirstFourNews();
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    @PostMapping("/addNews")
    public ResponseEntity<NewsDTO> addNews(@RequestBody NewsDTO newsDTO) {
        NewsDTO news = newsService.addNews(newsDTO);
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    @PutMapping("/updateNews")
    public ResponseEntity<NewsDTO> updateNews(@RequestParam String title, @RequestBody NewsDTO newsDTO) {
        NewsDTO news = newsService.updateNews(title, newsDTO);
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    @DeleteMapping("/deleteNews")
    public ResponseEntity<String> deleteNews(@RequestParam String title) {
        String response = newsService.deleteNews(title);
        return ResponseEntity.ok().body(response);
    }
}
