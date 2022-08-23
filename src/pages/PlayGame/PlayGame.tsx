import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";

const PlayGame = ({
  gameState,
  setGameState,
}: {
  gameState: {
    playing: boolean;
    roomCode: string;
    firebaseNodeName: string;
  };
  setGameState: React.Dispatch<
    React.SetStateAction<{
      playing: boolean;
      roomCode: string;
      firebaseNodeName: string;
    }>
  >;
}) => {
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
        <Box flex={1}>
          <Typography mt={10} variant="h3" style={{ textAlign: "center" }}>
            PLAYER 1
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
        <Box flex={1}>
          <Typography mt={10} variant="h3" style={{ textAlign: "center" }}>
            PLAYER 2
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
        <Box flex={1}>
          <Typography mt={10} variant="h3" style={{ textAlign: "center" }}>
            PLAYER 2
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
        <Box flex={1}>
          <Typography mt={10} variant="h3" style={{ textAlign: "center" }}>
            PLAYER 2
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
      </Box>
    </>
  );
};

export default PlayGame;
