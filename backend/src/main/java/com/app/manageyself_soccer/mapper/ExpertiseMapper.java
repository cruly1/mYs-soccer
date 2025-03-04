package com.app.manageyself_soccer.mapper;

import com.app.manageyself_soccer.dto.ExpertiseDTO;
import com.app.manageyself_soccer.model.Expertise;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {TrainerMapper.class})
public interface ExpertiseMapper {

    ExpertiseDTO toExpertiseDTO(Expertise expertise);
    Expertise toExpertise(ExpertiseDTO expertiseDTO);

}
