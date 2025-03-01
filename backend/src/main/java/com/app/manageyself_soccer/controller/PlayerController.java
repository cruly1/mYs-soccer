package com.app.manageyself_soccer.controller;

import com.app.manageyself_soccer.dto.PlayerDTO;
import com.app.manageyself_soccer.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("localhost:3000")
@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping("/getPlayerByName")
    public ResponseEntity<PlayerDTO> getPlayerByName(@RequestParam("name") String name) {
        PlayerDTO player = playerService.getPlayerByName(name);
        return ResponseEntity.ok().body(player);
    }

    @GetMapping("/getAllPlayers")
    public ResponseEntity<List<PlayerDTO>> getAllPlayers() {
        List<PlayerDTO> players = playerService.getAllPlayers();
        return ResponseEntity.ok().body(players);
    }

    @GetMapping("/getFirstFourPlayers")
    public ResponseEntity<List<PlayerDTO>> getFirstFourPlayers() {
        List<PlayerDTO> players = playerService.getFirstFourPlayers();
        return ResponseEntity.ok().body(players);
    }

    @PostMapping("/addPlayer")
    public ResponseEntity<PlayerDTO> addPlayer(@RequestBody PlayerDTO player) {
        PlayerDTO playerDTO = playerService.addPlayer(player);
        return ResponseEntity.ok().body(playerDTO);
    }

    @PutMapping("/updatePlayer")
    public ResponseEntity<PlayerDTO> updatePlayer(@RequestParam("name") String name, @RequestBody PlayerDTO player) {
        PlayerDTO playerDTO = playerService.updatePlayer(name, player);
        return ResponseEntity.ok().body(playerDTO);
    }

    @DeleteMapping("/deletePlayer")
    public ResponseEntity<String> deletePlayer(@RequestParam("name") String name) {
        String response = playerService.deletePlayer(name);
        return ResponseEntity.ok().body(response);
    }
}
