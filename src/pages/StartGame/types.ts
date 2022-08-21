export interface StartGameProps {
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
}

export interface roomStructure {
  roomCode: string;
  playersCount: number;
  activePlayer: number;
  playerNames: Array<string>;
  scores: Array<number>;
  roundScore: number;
  scoreToWin: number;
}
