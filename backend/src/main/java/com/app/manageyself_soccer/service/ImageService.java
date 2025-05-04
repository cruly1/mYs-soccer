package com.app.manageyself_soccer.service;

import com.app.manageyself_soccer.dao.*;
import com.app.manageyself_soccer.exception.customexceptions.ExpertiseNotFoundException;
import com.app.manageyself_soccer.exception.customexceptions.NewsNotFoundException;
import com.app.manageyself_soccer.exception.customexceptions.PlayerNotFoundException;
import com.app.manageyself_soccer.exception.customexceptions.TrainerNotFoundException;
import com.app.manageyself_soccer.model.*;
import com.app.manageyself_soccer.utils.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final PlayerRepository playerRepository;
    private final NewsRepository newsRepository;
    private final ImageRepository imageRepository;
    private final ImageUtils imageUtils;
    private final TrainerRepository trainerRepository;
    private final ExpertiseRepository expertiseRepository;

    public byte[] downloadImage(String fileName) {
        Optional<Image> dbImageData = imageRepository.findByName(fileName);
        return dbImageData.map(image -> imageUtils.decompressImage(image.getImageData())).orElse(null);
    }

    @Transactional
    public String uploadImageForPlayer(MultipartFile file, String nickName) throws IOException {
        Player player = playerRepository.findByName(nickName)
                .orElseThrow(() -> new PlayerNotFoundException("Player not found."));

        Image image = imageUtils.buildImage(file, nickName);

        player.setImageName(nickName);
        player.setImageType(image.getType());
        playerRepository.save(player);

        return "File uploaded successfully: " + file.getOriginalFilename();
    }

    @Transactional
    public String uploadImageForNews(MultipartFile file, String title) throws IOException {
        News news = newsRepository.findByTitle(title)
                .orElseThrow(() -> new NewsNotFoundException("News not found."));

        Image image = imageUtils.buildImage(file, title);

        news.setImageName(title);
        news.setImageType(image.getType());
        newsRepository.save(news);

        return "File uploaded successfully: " + file.getOriginalFilename();
    }

    @Transactional
    public String uploadImageForTrainer(MultipartFile file, String trainerName) throws IOException {
        Trainer trainer = trainerRepository.findByName(trainerName)
                .orElseThrow(() -> new TrainerNotFoundException("Trainer not found."));

        Image image = imageUtils.buildImage(file, trainerName);

        trainer.setImageName(trainerName);
        trainer.setImageType(image.getType());
        trainerRepository.save(trainer);

        return "File uploaded successfully: " + file.getOriginalFilename();
    }

    @Transactional
    public String uploadImageForExpertise(MultipartFile file, String expertiseName) throws IOException {
        Expertise expertise = expertiseRepository.findByTitle(expertiseName)
                .orElseThrow(() -> new ExpertiseNotFoundException("Expertise not found."));

        Image image = imageUtils.buildImage(file, expertiseName);

        expertise.setImageName(expertiseName);
        expertise.setImageType(image.getType());
        expertiseRepository.save(expertise);

        return "File uploaded successfully: " + file.getOriginalFilename();
    }
}
