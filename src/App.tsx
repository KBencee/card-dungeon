import { useState } from "react";
import Card from "./components/Card";
import cardsData from "../public/cards.json";
import Buttons from "./components/Buttons";
import Dice from "./components/Dice";
import Player from "./components/Player";

const randomCardFromDeck = () =>
  cardsData[Math.floor(Math.random() * cardsData.length)];

const App = () => {
  const [currentCard, setCurrentCard] = useState(() => randomCardFromDeck());
  const [diceValue, setDiceValue] = useState<number | null>(null);

  const rollDice = () => {
    const n = Math.floor(Math.random() * 6) + 1;
    setDiceValue(n);
  };

  return (
    <main>
      <div className="cards-container">
        <Card
          idx={0}
          name={currentCard.enemyName}
          icon={currentCard.enemyIcon}
          lvl={currentCard.level}
          reward={currentCard.reward}
          penalty={currentCard.penalty}
        />
        <div className="controls-container">
          <Dice value={diceValue} onRoll={rollDice} />
          <Buttons />
        </div>
      </div>

      <div className="player-container">
        <Player hp={5} maxHp={5} rewards={[]} />
      </div>
    </main>
  );
};

export default App;