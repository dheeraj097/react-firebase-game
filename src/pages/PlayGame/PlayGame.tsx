import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { roomStructure } from "../StartGame/types";
import { database, gamesCollection } from "../../libs/firebase";
import { doc, getDocs, query, runTransaction, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CircleIcon from "@mui/icons-material/Circle";
import WinnerCelebrations from "../../components/WinnerCelebrations";
import { playAudio } from "../../libs/utils";

const PlayGame = ({
  gameState,
  setGameState,
  playerId,
}: {
  gameState: roomStructure;
  setGameState: React.Dispatch<React.SetStateAction<roomStructure>>;
  playerId: number;
}) => {
  const docQuery = query(
    gamesCollection,
    where("roomCode", "==", gameState.roomCode)
  );
  const [fbData] = useCollectionData(docQuery) || [];

  const handleRollDice = async () => {
    playAudio();
    const rolledDice = Math.floor(Math.random() * 6) + 1; // generate random number b/w 1 and 6

    const querySnapshot = await getDocs(docQuery);
    querySnapshot.forEach(async (roomDoc) => {
      // Create a reference to the room doc.
      const gameRoomDocRef = doc(database, "games", roomDoc.id);

      // update round score
      let roundScore = roomDoc.data().roundScore;
      let activePlayer = roomDoc.data().activePlayer;
      const playersCount = roomDoc.data().playersCount;

      if (rolledDice === 1) {
        // rotate through all players
        activePlayer = (activePlayer + 1) % playersCount;
        roundScore = 0;
      } else {
        roundScore = roundScore + rolledDice;
      }

      await runTransaction(database, async (transaction) => {
        // Update room state in firebase
        transaction.update(gameRoomDocRef, {
          diceRoll: rolledDice,
          roundScore: roundScore,
          activePlayer: activePlayer,
        });
      });
    });
  };

  const handleHoldDice = async () => {
    const querySnapshot = await getDocs(docQuery);
    querySnapshot.forEach(async (roomDoc) => {
      // Create a reference to the room doc.
      const gameRoomDocRef = doc(database, "games", roomDoc.id);

      let winner = "";
      let roundScore = roomDoc.data().roundScore;
      let activePlayer = roomDoc.data().activePlayer;
      let scores = roomDoc.data().scores;
      let playing = roomDoc.data().playing;

      const playersCount = roomDoc.data().playersCount;
      const scoreToWin = roomDoc.data().scoreToWin;
      const playerNames = roomDoc.data().playerNames;

      scores[playerId] = scores[playerId] + roundScore;

      if (scores[playerId] >= scoreToWin) {
        // someone won the game
        playing = false;
        winner = playerNames[activePlayer];
      } else {
        // rotate through all players
        activePlayer = (activePlayer + 1) % playersCount;
      }
      roundScore = 0;

      await runTransaction(database, async (transaction) => {
        // Update room state in firebase
        transaction.update(gameRoomDocRef, {
          roundScore: roundScore,
          activePlayer: activePlayer,
          scores: scores,
          playing: playing,
          winner: winner,
        });
      });
    });
  };

  return (
    <>
      <Box style={{ background: "#f2ebeb" }}>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h4">
            Room Code: {gameState.roomCode} | Score To Win:{" "}
            {gameState.scoreToWin}
          </Typography>
          <Button>
            <ControlPointRoundedIcon />
            <Typography variant="h5">New Game</Typography>
          </Button>
        </Box>
        <Box display="flex" margin="0 auto" minHeight="50vh">
          {fbData &&
            fbData[0].playerNames.map((playerName: string, index: number) => {
              return (
                <Box
                  flex={1}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                  key={index}
                >
                  <Typography variant="h3" style={{ textAlign: "center" }}>
                    {playerName ? (
                      <>
                        {playerName}
                        {fbData[0].playing &&
                          index === fbData[0].activePlayer && <CircleIcon />}
                        {!fbData[0].playing && playerName === fbData[0].winner && (
                          <span role="img" aria-label="winner">
                            👑
                          </span>
                        )}
                      </>
                    ) : (
                      "Waiting..."
                    )}
                  </Typography>
                  <Typography variant="h2" style={{ textAlign: "center" }}>
                    {fbData[0].activePlayer === index
                      ? fbData[0].roundScore
                      : 0}
                  </Typography>
                  <Box
                    sx={{
                      background: "red",
                      color: "#fff",
                      width: "20%",
                      margin: "0 auto",
                      padding: "12px",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{ textAlign: "center", color: "#000" }}
                    >
                      Score
                    </Typography>
                    <Typography variant="h2" style={{ textAlign: "center" }}>
                      {fbData[0].scores[index]}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          <Box
            style={{
              position: "absolute",
              left: "46%",
              top: "40%",
              height: "30vh",
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {fbData && (
                <>
                  <img
                    alt="dice"
                    src={require("../../images/dice-" +
                      fbData[0].diceRoll +
                      ".png")}
                    width="100px"
                    height="100px"
                  />
                  <Button
                    disabled={playerId !== fbData[0].activePlayer}
                    variant="contained"
                    color="primary"
                    onClick={handleRollDice}
                    sx={{
                      marginTop: "15px",
                      marginBottom: "15px",
                    }}
                  >
                    Roll
                  </Button>
                  <Button
                    disabled={playerId !== fbData[0].activePlayer}
                    variant="contained"
                    color="secondary"
                    onClick={handleHoldDice}
                  >
                    Hold
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      {fbData && fbData[0].winner !== "" && <WinnerCelebrations />}
    </>
  );
};

export default PlayGame;
