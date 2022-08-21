import { useState } from "react";
import { Box } from "@mui/material";
import PlayGame from "./PlayGame/PlayGame";
import StartGame from "./StartGame/StartGame";

const Home = (): JSX.Element => {
  const [gameStarted, setGameStarted] = useState(false);
  // setGameStarted(false);
  return (
    <Box border="2px solid red">
      {gameStarted ? (
        <PlayGame />
      ) : (
        <StartGame setGameStarted={setGameStarted} />
      )}
    </Box>
  );
};

export default Home;
