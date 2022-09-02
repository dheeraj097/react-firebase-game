import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { roomStructure } from "../StartGame/types";
import { gamesCollection } from "../../libs/firebase";
import { query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
// import { doc, onSnapshot } from "firebase/firestore";

const PlayGame = ({
  gameState,
  setGameState,
}: {
  gameState: roomStructure;
  setGameState: React.Dispatch<React.SetStateAction<roomStructure>>;
}) => {
  // const unsub = onSnapshot(
  //   doc(database, "games", gameState.firebaseNodeName || ""),
  //   (doc) => {
  //     console.log("Current data: ", doc.data(), doc.data()?.name);
  //     console.log(gameState);
  //   }
  // );
  // console.log(unsub);

  const docQuery = query(
    gamesCollection,
    where("roomCode", "==", gameState.roomCode)
  );

  const [fbData] = useCollectionData(docQuery) || [];

  console.log(fbData && fbData[0]);

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
        {fbData &&
          fbData[0].playerNames.map((playerName: string, index: number) => {
            return (
              <Box flex={1} key={index}>
                <Typography
                  mt={10}
                  variant="h3"
                  style={{ textAlign: "center" }}
                >
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
