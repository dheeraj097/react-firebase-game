import React from "react";
import { Button, Typography } from "@mui/material";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";

const StartGame = ({
  setGameStarted,
}: {
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Typography variant="h6" style={{ textAlign: "center", color: "#000" }}>
        Welcome
      </Typography>
      <Button onClick={() => setGameStarted(true)}>
        <ControlPointRoundedIcon />
        <Typography variant="h5">Start Game</Typography>
      </Button>
    </>
  );
};

export default StartGame;
