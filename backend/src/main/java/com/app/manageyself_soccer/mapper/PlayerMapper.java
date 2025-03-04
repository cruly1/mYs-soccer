package com.app.manageyself_soccer.mapper;

import com.app.manageyself_soccer.dto.PlayerDTO;
import com.app.manageyself_soccer.model.Player;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PlayerMapper {

    PlayerDTO toPlayerDTO(Player player);
    Player toPlayer(PlayerDTO playerDTO);

}
