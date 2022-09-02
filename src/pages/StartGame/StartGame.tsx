import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import makeRoomId from "../../libs/utils";
import { roomStructure, StartGameProps } from "./types";
import { gamesCollection } from "../../libs/firebase";
import { addDoc } from "firebase/firestore";

const StartGame = (props: StartGameProps) => {
  const { gameState, setGameState } = props;
  const [gameData, setGameData] = useState({
    playerName: "",
    scoreToWin: "1",
    playersCount: "2",
    roomCode: "",
  });

  let name: string, value: string;
  const handleGameDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    name = e.target.name;
    value = e.target.value;
    setGameData({ ...gameData, [name]: value });
  };

  const handleCreateRoom = () => {
    // create an array of size of players count
    const playersNames: string[] = new Array(
      parseInt(gameData.playersCount)
    ).fill("");

    // push the players name at first index
    playersNames[0] = gameData.playerName;

    const payload: roomStructure = {
      playing: true,
      roomCode: makeRoomId(6),
      playersCount: parseInt(gameData.playersCount),
      activePlayer: 0,
      playerNames: playersNames,
      scores: new Array(parseInt(gameData.playersCount)).fill(0),
      roundScore: 0,
      scoreToWin: parseInt(gameData.scoreToWin),
    };

    const gameRef = addDoc(gamesCollection, payload);
    gameRef.then((res) => {
      setGameState({
        ...gameState,
        playing: true,
        roomCode: payload.roomCode,
        playersCount: payload.playersCount,
        activePlayer: payload.activePlayer,
        playerNames: payload.playerNames,
        scores: payload.scores,
        roundScore: payload.roundScore,
        scoreToWin: payload.scoreToWin,
        firebaseNodeName: res.id || "",
      });
    });
  };

  const handleJoinRoom = () => {
    
  };
  return (
    <Box mt={5} mb={5}>
      <Typography variant="h4" style={{ textAlign: "center" }} mb={5}>
        Welcome to the game
      </Typography>
      <Box textAlign="center" mb={5}>
        <TextField
          name="playerName"
          label="Your Name"
          variant="outlined"
          value={gameData.playerName}
          onChange={handleGameDataChange}
        />
      </Box>
      <Box display="flex" justifyContent="space-around">
        <Box display="flex" flexDirection="column" textAlign="center">
          <TextField
            name="scoreToWin"
            label="Score to win"
            variant="outlined"
            type="number"
            value={gameData.scoreToWin}
            onChange={handleGameDataChange}
          />
          <TextField
            name="playersCount"
            label="Players Count"
            variant="outlined"
            type="number"
            value={gameData.playersCount}
            onChange={handleGameDataChange}
            sx={{ mt: 2 }}
          />
          <Button sx={{ mt: 2 }} onClick={handleCreateRoom} variant="contained">
            <Typography variant="h5">Create Room</Typography>
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" textAlign="center">
          <TextField
            name="roomCode"
            label="Room Code"
            variant="outlined"
            value={gameData.roomCode}
            onChange={handleGameDataChange}
          />
          <Button sx={{ mt: 2 }} onClick={handleJoinRoom} variant="contained">
            <Typography variant="h5">Join Room</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StartGame;
