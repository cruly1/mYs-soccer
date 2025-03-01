package com.app.manageyself_soccer.service;

import com.app.manageyself_soccer.dto.PlayerDTO;
import com.app.manageyself_soccer.exception.customexceptions.PlayerNotFoundException;
import com.app.manageyself_soccer.mapper.PlayerMapper;
import com.app.manageyself_soccer.model.Player;
import com.app.manageyself_soccer.dao.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final PlayerMapper playerMapper;

    private static final String playerNotFound = "Player not found.";

    public PlayerDTO getPlayerByName(String name) {
        Player player = playerRepository.findByName(name)
                .orElseThrow(() -> new PlayerNotFoundException(playerNotFound));
        return playerMapper.toDTO(player);
    }

    public List<PlayerDTO> getAllPlayers() {
        List<Player> players = playerRepository.findAll();
        return players.stream().map(playerMapper::toDTO).toList();
    }

    public List<PlayerDTO> getFirstFourPlayers() {
        List<Player> players = playerRepository.findTop4ByOrderByNameAsc();
        return players.stream().map(playerMapper::toDTO).toList();
    }

    public PlayerDTO addPlayer(PlayerDTO playerDTO) {
        playerRepository.save(playerMapper.toEntity(playerDTO));
        return playerDTO;
    }

    public PlayerDTO updatePlayer(String name, PlayerDTO playerDTO) {
        Player player = playerRepository.findByName(name)
                .orElseThrow(() -> new PlayerNotFoundException(playerNotFound));

        player.setName(playerDTO.getName());
        player.setDateOfBirth(playerDTO.getDateOfBirth());
        player.setPosition(playerDTO.getPosition());

        playerRepository.save(player);

        return playerDTO;
    }

    public String deletePlayer(String name) {
        Player player = playerRepository.findByName(name)
                .orElseThrow(() -> new PlayerNotFoundException(playerNotFound));

        playerRepository.delete(player);
        return "Player deleted.";
    }
}
