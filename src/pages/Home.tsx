import { useState } from "react";
import { Box } from "@mui/material";
import PlayGame from "./PlayGame/PlayGame";
import StartGame from "./StartGame/StartGame";
import { roomStructure } from "./StartGame/types";

const Home = (): JSX.Element => {
  const [playerId, setPlayerId] = useState(0);
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
    diceRoll: 1,
    winner: "",
  });
  return (
    <Box mt={5} border="2px solid red">
      {gameState.playing ? (
        <PlayGame
          gameState={gameState}
          setGameState={setGameState}
          playerId={playerId}
        />
      ) : (
        <StartGame
          gameState={gameState}
          setGameState={setGameState}
          setPlayerId={setPlayerId}
        />
      )}
    </Box>
  );
};

export default Home;
