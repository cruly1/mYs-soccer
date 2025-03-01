package com.app.manageyself_soccer.mapper;

import com.app.manageyself_soccer.dto.PlayerDTO;
import com.app.manageyself_soccer.model.Player;
import org.springframework.stereotype.Component;

@Component
public class PlayerMapper {

    public PlayerDTO toDTO(Player player) {
        return PlayerDTO.builder()
                .name(player.getName())
                .dateOfBirth(player.getDateOfBirth())
                .position(player.getPosition())
                .build();
    }

    public Player toEntity(PlayerDTO playerDTO) {
        return Player.builder()
                .name(playerDTO.getName())
                .dateOfBirth(playerDTO.getDateOfBirth())
                .position(playerDTO.getPosition())
                .build();
    }
}
