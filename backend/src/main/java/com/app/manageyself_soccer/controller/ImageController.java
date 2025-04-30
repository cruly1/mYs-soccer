package com.app.manageyself_soccer.controller;

import com.app.manageyself_soccer.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin("localhost:3000")
@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @GetMapping("/downloadImage")
    public ResponseEntity<?> downloadImage(@RequestParam("fileName") String fileName) {
        byte[] imageData = imageService.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }

    @PostMapping("/uploadImageForPlayer")
    public ResponseEntity<?> uploadImageForPlayer(@RequestParam("image") MultipartFile file, @RequestParam("nickName") String nickName) throws IOException {
        String uploadImage = imageService.uploadImageForPlayer(file, nickName);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @PostMapping("/uploadImageForNews")
    public ResponseEntity<?> uploadImageForNews(@RequestParam("image") MultipartFile file, @RequestParam("title") String title) throws IOException {
        String uploadImage = imageService.uploadImageForNews(file, title);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @PostMapping("/uploadImageForTrainer")
    public ResponseEntity<?> uploadImageForTrainer(@RequestParam("image") MultipartFile file, @RequestParam("trainer") String trainer) throws IOException {
        String uploadImage = imageService.uploadImageForTrainer(file, trainer);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }
}
