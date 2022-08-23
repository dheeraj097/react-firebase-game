import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import makeRoomId from "../../libs/utils";
import { roomStructure, StartGameProps } from "./types";
import { getDatabase, ref, set } from "firebase/database";

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

  const handleCreateRoom = async () => {
    const payload: roomStructure = {
      roomCode: makeRoomId(5),
      playersCount: parseInt(gameData.playersCount),
      activePlayer: 0,
      playerNames: [gameData.playerName],
      scores: new Array(parseInt(gameData.playersCount)).fill(0),
      roundScore: 0,
      scoreToWin: parseInt(gameData.scoreToWin),
    };
    const res = await fetch(`${process.env.REACT_APP_databaseURL}games.json`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      let resJson = await res.json();
      setGameState({
        ...gameState,
        playing: true,
        roomCode: payload.roomCode,
        firebaseNodeName: resJson.name,
      });
    }

    const db = getDatabase();
    set(ref(db, "games/" + payload.roomCode), payload)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <Button sx={{ mt: 2 }} variant="contained">
            <Typography variant="h5">Join Room</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StartGame;
