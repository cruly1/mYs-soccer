package com.app.manageyself_soccer.service;

import com.app.manageyself_soccer.dao.ExpertiseRepository;
import com.app.manageyself_soccer.dao.ImageRepository;
import com.app.manageyself_soccer.dao.TrainerRepository;
import com.app.manageyself_soccer.dto.ExpertiseDTO;
import com.app.manageyself_soccer.dto.TrainerDTO;
import com.app.manageyself_soccer.exception.customexceptions.ExpertiseNotFoundException;
import com.app.manageyself_soccer.exception.customexceptions.ImageNotFoundException;
import com.app.manageyself_soccer.exception.customexceptions.TrainerNotFoundException;
import com.app.manageyself_soccer.mapper.ExpertiseMapper;
import com.app.manageyself_soccer.mapper.TrainerMapper;
import com.app.manageyself_soccer.model.Expertise;
import com.app.manageyself_soccer.model.Image;
import com.app.manageyself_soccer.model.Trainer;
import com.app.manageyself_soccer.payload.CreateStudiesRequest;
import com.app.manageyself_soccer.payload.DeleteStudyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpertiseService {

    private final ExpertiseRepository expertiseRepository;
    private final ExpertiseMapper expertiseMapper;
    private final TrainerRepository trainerRepository;
    private final TrainerMapper trainerMapper;
    private final ImageRepository imageRepository;

    public ExpertiseDTO getExpertiseByTitle(String title) {
        Expertise expertise = expertiseRepository.findByTitle(title)
                .orElseThrow(() -> new ExpertiseNotFoundException("Expertise not found."));

        return expertiseMapper.toExpertiseDTO(expertise);
    }

    public Set<ExpertiseDTO> getAllExpertise() {
        List<Expertise> expertise = expertiseRepository.findAll();

        return expertise.stream().map(expertiseMapper::toExpertiseDTO).collect(Collectors.toSet());
    }

    public ExpertiseDTO createExpertise(ExpertiseDTO expertiseDTO) {
        Expertise expertise = expertiseMapper.toExpertise(expertiseDTO);
        expertiseRepository.save(expertise);

        return expertiseDTO;
    }

    @Transactional
    public ExpertiseDTO createTrainer(String title, TrainerDTO trainerDTO) {
        Expertise expertise = expertiseRepository.findByTitle(title)
                .orElseThrow(() -> new ExpertiseNotFoundException("Expertise not found."));

        Trainer trainer = trainerMapper.toTrainer(trainerDTO);

        Set<Trainer> trainers = expertise.getTrainers();
        trainers.add(trainer);
        expertise.setTrainers(trainers);

        trainerRepository.save(trainer);
        expertiseRepository.save(expertise);

        return expertiseMapper.toExpertiseDTO(expertise);
    }

    public ExpertiseDTO createStudies(String title, CreateStudiesRequest studies) {
        Expertise expertise = expertiseRepository.findByTitle(title)
                .orElseThrow(() -> new ExpertiseNotFoundException("Expertise not found."));

        Set<String> currentStudies = expertise.getStudy();
        currentStudies.addAll(studies.getStudies());
        expertise.setStudy(currentStudies);

        expertiseRepository.save(expertise);

        return expertiseMapper.toExpertiseDTO(expertise);
    }

    public ExpertiseDTO updateExpertise(String title, ExpertiseDTO expertiseDTO) {
        Expertise expertise = expertiseRepository.findByTitle(title)
                .orElseThrow(() -> new ExpertiseNotFoundException("Expertise not found."));

        expertise.setTitle(expertiseDTO.getTitle());
        expertise.setBriefContent(expertiseDTO.getBriefContent());
        expertise.setContent(expertiseDTO.getContent());
        expertise.setStudy(expertiseDTO.getStudy());

        if (expertise.getImageName() != null) {
            Image image = imageRepository.findByName(expertise.getImageName())
                    .orElseThrow(() -> new ImageNotFoundException("Image not found."));
            image.setName(expertiseDTO.getImageName());
            expertise.setImageName(expertiseDTO.getImageName());
            imageRepository.save(image);
        }

        expertiseRepository.save(expertise);

        return expertiseMapper.toExpertiseDTO(expertise);
    }

    public String deleteExpertise(String title) {
        Expertise expertise = expertiseRepository.findByTitle(title)
                .orElseThrow(() -> new ExpertiseNotFoundException("Expertise not found."));

        if (expertise.getImageName() != null) {
            Image image = imageRepository.findByName(expertise.getImageName())
                    .orElseThrow(() -> new ImageNotFoundException("Image not found."));
            imageRepository.deleteById(image.getId());
        }

        expertiseRepository.delete(expertise);

        return "Expertise deleted.";
    }

    @Transactional
    public String deleteTrainer(String title, String name) {
        Expertise expertise = expertiseRepository.findByTitle(title)
                .orElseThrow(() -> new ExpertiseNotFoundException("Expertise not found."));

        Trainer trainer = trainerRepository.findByName(name)
                .orElseThrow(() -> new TrainerNotFoundException("Trainer not found."));

        if (trainer.getImageName() != null) {
            Image image = imageRepository.findByName(trainer.getImageName())
                    .orElseThrow(() -> new ImageNotFoundException("Image not found."));
            imageRepository.deleteById(image.getId());
        }

        expertise.getTrainers().remove(trainer);
        trainerRepository.deleteByName(name);
        expertiseRepository.save(expertise);

        return "Trainer deleted.";
    }

    public String deleteStudyFromExpertise(String title, DeleteStudyRequest study) {
        Expertise expertise = expertiseRepository.findByTitle(title)
                .orElseThrow(() -> new ExpertiseNotFoundException("Expertise not found."));

        expertise.getStudy().remove(study);

        expertiseRepository.save(expertise);

        return "Study deleted.";
    }
}
