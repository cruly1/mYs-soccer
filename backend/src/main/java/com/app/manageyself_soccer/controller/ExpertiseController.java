package com.app.manageyself_soccer.controller;

import com.app.manageyself_soccer.dto.ExpertiseDTO;
import com.app.manageyself_soccer.dto.TrainerDTO;
import com.app.manageyself_soccer.payload.CreateStudiesRequest;
import com.app.manageyself_soccer.service.ExpertiseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@CrossOrigin("localhost:3000")
@RestController
@RequestMapping("/api/expertise")
@RequiredArgsConstructor
public class ExpertiseController {

    private final ExpertiseService expertiseService;

    @GetMapping("/getExpertiseByTitle")
    public ResponseEntity<ExpertiseDTO> getExpertiseByTitle(@RequestParam("title") String title) {
        ExpertiseDTO result = expertiseService.getExpertiseByTitle(title);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/getAllExpertise")
    public ResponseEntity<Set<ExpertiseDTO>> getAllExpertise() {
        Set<ExpertiseDTO> result = expertiseService.getAllExpertise();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/createExpertise")
    public ResponseEntity<ExpertiseDTO> createExpertise(@RequestBody ExpertiseDTO dto) {
        ExpertiseDTO result = expertiseService.createExpertise(dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PostMapping("/createTrainer")
    public ResponseEntity<ExpertiseDTO> createTrainer(@RequestParam("title") String title, @RequestBody TrainerDTO dto) {
        ExpertiseDTO result = expertiseService.createTrainer(title, dto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PostMapping("/createStudies")
    public ResponseEntity<ExpertiseDTO> createStudies(@RequestParam("title") String title, @RequestBody CreateStudiesRequest request) {
        ExpertiseDTO result = expertiseService.createStudies(title, request);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PutMapping("/updateExpertise")
    public ResponseEntity<ExpertiseDTO> updateExpertise(@RequestParam("title") String title, @RequestBody ExpertiseDTO dto) {
        ExpertiseDTO result = expertiseService.updateExpertise(title, dto);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/deleteExpertise")
    public ResponseEntity<String> deleteExpertise(@RequestParam("title") String title) {
        String result = expertiseService.deleteExpertise(title);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/deleteTrainer")
    public ResponseEntity<String> deleteTrainer(@RequestParam("title") String title, @RequestParam("name") String name) {
        String result = expertiseService.deleteTrainer(title, name);
        return ResponseEntity.ok(result);
    }
}
