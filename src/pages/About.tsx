import React from "react";

const About = () => {
  return (
    <>
      <h1>Game Rules</h1>
      <h3>The game can have 2 to 4 players, playing in rounds.</h3>
      <h3>
        In each turn, a player rolls a dice as many times as he whishes. Each
        result get added to his ROUND score.
      </h3>
      <h3>
        BUT, if the player rolls a 1, all his ROUND score gets lost. After that,
        it's the next player's turn
      </h3>
      <h3>
        The player can choose to 'Hold', which means that his ROUND score gets
        added to his GLOBAL score. After that, it's the next player's turn
      </h3>
      <h3>
        The first player to reach <i>Score to win</i> points on GLOBAL score
        wins the game
      </h3>
    </>
  );
};

export default About;
