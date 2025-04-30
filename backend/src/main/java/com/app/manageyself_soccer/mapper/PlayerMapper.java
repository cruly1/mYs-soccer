package com.app.manageyself_soccer.mapper;

import com.app.manageyself_soccer.dto.PlayerDTO;
import com.app.manageyself_soccer.model.Player;
import com.app.manageyself_soccer.payload.AddPlayerRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PlayerMapper {

    @Mapping(target = "age", expression = "java(player.getAge())")
    PlayerDTO toPlayerDTO(Player player);

    Player toPlayer(AddPlayerRequest request);
}
