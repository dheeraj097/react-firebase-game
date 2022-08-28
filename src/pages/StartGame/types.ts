export interface roomStructure {
  playing: boolean;
  roomCode: string;
  playersCount: number;
  activePlayer: number;
  playerNames: string[];
  scores: number[];
  roundScore: number;
  scoreToWin: number;
  firebaseNodeName?: string;
}

export interface StartGameProps {
  gameState: roomStructure;
  setGameState: React.Dispatch<React.SetStateAction<roomStructure>>;
}
