import { useState } from "react";
import { Box } from "@mui/material";
import PlayGame from "./PlayGame/PlayGame";
import StartGame from "./StartGame/StartGame";
import { roomStructure } from "./StartGame/types";

const Home = (): JSX.Element => {
  const [gameState, setGameState] = useState<roomStructure>({
    playing: false,
    roomCode: "",
    playersCount: 0,
    activePlayer: 0,
    playerNames: [],
    scores: [],
    roundScore: 0,
    scoreToWin: 0,
    firebaseNodeName: "",
  });
  return (
    <Box mt={5} border="2px solid red">
      {gameState.playing ? (
        <PlayGame gameState={gameState} setGameState={setGameState} />
      ) : (
        <StartGame gameState={gameState} setGameState={setGameState} />
      )}
    </Box>
  );
};

export default Home;
