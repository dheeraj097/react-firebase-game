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
  diceRoll: number;
}

export interface StartGameProps {
  gameState: roomStructure;
  setGameState: React.Dispatch<React.SetStateAction<roomStructure>>;
  setPlayerId: React.Dispatch<React.SetStateAction<number>>;
}
