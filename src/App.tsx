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

  const [hp, setHp] = useState<number>(5);
  const maxHp = 5;
  const [rewards, setRewards] = useState<string[]>([]);

  const handleFight = () => {
    if (diceValue === null) 
      return;
    if (diceValue > currentCard.level) {
      setRewards((prev) => [...prev, currentCard.reward]);
      setCurrentCard(randomCardFromDeck());
    } else {
      const koponya = "💀";
      const skullCount = (currentCard.penalty.match(new RegExp(koponya, "g")) || []).length;
      if (skullCount > 0) {
        setHp((h) => Math.max(0, h - skullCount));
    }} 
    setCurrentCard(randomCardFromDeck());
    setDiceValue(null);
  };

  const handleFlee = () => {
    setCurrentCard(randomCardFromDeck());
    setDiceValue(null);
  }

  

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
          <Buttons onFight={handleFight} onFlee={handleFlee}/>
        </div>
      </div>

      <div className="player-container">
        <Player hp={5} maxHp={5} rewards={[]} />
      </div>
    </main>
  );
};

export default App;