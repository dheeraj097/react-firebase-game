import { useState } from "react";
import { Box } from "@mui/material";
import PlayGame from "./PlayGame/PlayGame";
import StartGame from "./StartGame/StartGame";

const Home = (): JSX.Element => {
  const [gameState, setGameState] = useState({
    playing: false,
    roomCode: "",
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
