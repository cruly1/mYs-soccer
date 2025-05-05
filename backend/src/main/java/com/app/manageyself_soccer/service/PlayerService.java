package com.app.manageyself_soccer.service;

import com.app.manageyself_soccer.dao.ImageRepository;
import com.app.manageyself_soccer.dto.PlayerDTO;
import com.app.manageyself_soccer.exception.customexceptions.ImageNotFoundException;
import com.app.manageyself_soccer.exception.customexceptions.PlayerNotFoundException;
import com.app.manageyself_soccer.mapper.PlayerMapper;
import com.app.manageyself_soccer.model.Image;
import com.app.manageyself_soccer.model.Player;
import com.app.manageyself_soccer.dao.PlayerRepository;
import com.app.manageyself_soccer.payload.AddPlayerRequest;
import com.app.manageyself_soccer.payload.UpdatePlayerRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final PlayerMapper playerMapper;
    private final ImageRepository imageRepository;

    private static final String playerNotFound = "Player not found.";

    public PlayerDTO getPlayerByName(String name) {
        Player player = playerRepository.findByName(name)
                .orElseThrow(() -> new PlayerNotFoundException(playerNotFound));
        return playerMapper.toPlayerDTO(player);
    }

    public List<PlayerDTO> getAllPlayers() {
        List<Player> players = playerRepository.findAll();
        return players.stream().map(playerMapper::toPlayerDTO).toList();
    }

    public List<PlayerDTO> getFirstFourPlayers() {
        List<Player> players = playerRepository.findTop4ByOrderByNameAsc();
        return players.stream().map(playerMapper::toPlayerDTO).toList();
    }

    public PlayerDTO addPlayer(AddPlayerRequest request) {
        Player player = playerMapper.toPlayer(request);
        playerRepository.save(player);
        return playerMapper.toPlayerDTO(player);
    }

    @Transactional
    public PlayerDTO updatePlayer(String name, UpdatePlayerRequest request) {
        Player player = playerRepository.findByName(name)
                .orElseThrow(() -> new PlayerNotFoundException(playerNotFound));

        player.setName(request.getName());
        player.setDateOfBirth(request.getDateOfBirth());
        player.setPlaceOfBirth(request.getPlaceOfBirth());
        player.setHeightInCm(request.getHeightInCm());
        player.setWeightInKg(request.getWeightInKg());
        player.setSlogan(request.getSlogan());
        player.setLeg(request.getLeg());
        player.setTeam(request.getTeam());
        player.setPosition(request.getPosition());

        if (player.getImageName() != null) {
            Image image = imageRepository.findByName(player.getImageName())
                    .orElseThrow(() -> new ImageNotFoundException("Image not found."));
            image.setName(player.getName());
            player.setImageName(player.getImageName());
            imageRepository.save(image);
        }

        playerRepository.save(player);

        return playerMapper.toPlayerDTO(player);
    }

    public String deletePlayer(String name) {
        Player player = playerRepository.findByName(name)
                .orElseThrow(() -> new PlayerNotFoundException(playerNotFound));

        if (player.getImageName() != null) {
            Image image = imageRepository.findByName(player.getImageName())
                    .orElseThrow(() -> new ImageNotFoundException("Image not found."));
            imageRepository.deleteById(image.getId());
        }

        playerRepository.delete(player);
        return "Player deleted.";
    }
}
