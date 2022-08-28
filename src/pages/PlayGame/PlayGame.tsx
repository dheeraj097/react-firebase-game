import React from "react";
import { databaseRef } from "../../libs/firebase";
import { Box, Button, Typography } from "@mui/material";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { onChildAdded, onChildChanged } from "firebase/database";
import { roomStructure } from "../StartGame/types";

const PlayGame = ({
  gameState,
  setGameState,
}: {
  gameState: roomStructure;
  setGameState: React.Dispatch<React.SetStateAction<roomStructure>>;
}) => {
  onChildChanged(databaseRef, (data) => {
    console.log(data.key, data.val());
  });
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          // marginTop: "50px",
        }}
      >
        <Button>
          <ControlPointRoundedIcon />
          <Typography variant="h4">Room Code: {gameState.roomCode}</Typography>
        </Button>
        <Button>
          <ControlPointRoundedIcon />
          <Typography variant="h5">New Game</Typography>
        </Button>
      </Box>
      <Box display="flex" minHeight="60vh" margin="0 auto">
        {gameState.playerNames.map((playerName) => {
          return (
            <Box flex={1} key={playerName}>
              <Typography mt={10} variant="h3" style={{ textAlign: "center" }}>
                {playerName ? playerName : "Waiting..."}
              </Typography>
              <Typography
                variant="h1"
                style={{ textAlign: "center", marginBottom: "100px" }}
              >
                0
              </Typography>
              <Box
                sx={{
                  background: "red",
                  color: "#fff",
                  width: "20%",
                  margin: "0 auto",
                  padding: "12px",
                  texAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ textAlign: "center", color: "#000" }}
                >
                  Current
                </Typography>
                <Typography variant="h4" style={{ textAlign: "center" }}>
                  0
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default PlayGame;
