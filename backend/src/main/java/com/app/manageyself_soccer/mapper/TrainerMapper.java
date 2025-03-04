package com.app.manageyself_soccer.mapper;

import com.app.manageyself_soccer.dto.TrainerDTO;
import com.app.manageyself_soccer.model.Trainer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TrainerMapper {

    TrainerDTO toTrainerDTO(Trainer trainer);
    Trainer toTrainer(TrainerDTO trainerDTO);

}
