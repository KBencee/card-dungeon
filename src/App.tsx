import { useState, useEffect } from "react";
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

  const maxDmg = 5;

  const showWinIfGold = (rewardText: string, count = 1) => {
    if (rewardText.includes("🥇") && count > 0) {
      alert("Nyertél!");
      setHp(maxHp);
      setRewards([]);
      setCurrentCard(randomCardFromDeck());
      setDiceValue(null);
    }
  };

  const handleFight = () => {
    if (diceValue === null) {
      return;
    }

    const rawAttack = rewards.reduce(
      (acc, reward) => acc + (reward.includes("⚔") || reward.includes("⚔️") ? 1 : 0),
      0
    );
    const attackBonus = Math.min(rawAttack, maxDmg);
    const effectiveRoll = diceValue + attackBonus;

    const countOccurrences = (text: string, variants: string[]) =>
      variants.reduce((acc, variant) => acc + (text.split(variant).length - 1), 0);

    const heartVariants = ["❤️", "♥️", "❤"];
    const swordVariants = ["⚔", "⚔️"];
    const skullVariants = ["💀"];

    if (effectiveRoll > currentCard.level) {
      const rewardHearts = countOccurrences(currentCard.reward, heartVariants);
      const rewardSwords = countOccurrences(currentCard.reward, swordVariants);

      if (rewardHearts > 0) {
        setHp((h) => {
          const next = Math.min(maxHp, h + rewardHearts);
          return next;
        });
      }

      if (rewardSwords > 0) {
        const currentSwords = rewards.reduce(
          (acc, r) => acc + ((r.includes("⚔") || r.includes("⚔️")) ? 1 : 0),
          0
        );
        const canAdd = Math.max(0, maxDmg - currentSwords);
        const toAdd = Math.min(canAdd, rewardSwords);
        if (toAdd > 0) {
          showWinIfGold(currentCard.reward, toAdd);
          setRewards((prev) => [...prev, ...Array(toAdd).fill(currentCard.reward)]);
        }
      }

      const otherCount = rewardHearts + rewardSwords;
      if (otherCount === 0) {
        showWinIfGold(currentCard.reward, 1);
        setRewards((prev) => [...prev, currentCard.reward]);
      }
    } else {
      const heartCount = countOccurrences(currentCard.penalty, heartVariants);
      const swordCount = countOccurrences(currentCard.penalty, swordVariants);
      const skullCount = countOccurrences(currentCard.penalty, skullVariants);

      const totalHpLoss = heartCount + skullCount;
      if (totalHpLoss > 0) {
        setHp((h) => {
          const next = Math.max(0, h - totalHpLoss);
          return next;
        });
      }

      if (swordCount > 0) {
        setRewards((prev) => {
          let toRemove = swordCount;
          const next: string[] = [];
          for (const r of prev) {
            if (toRemove > 0 && (r.includes("⚔") || r.includes("⚔️"))) {
              toRemove--;
              continue;
            }
            next.push(r);
          }
          return next;
        });
      }
    }

    setCurrentCard(randomCardFromDeck());
    setDiceValue(null);
  };

  const handleFlee = () => {
    setCurrentCard(randomCardFromDeck());
    setDiceValue(null);
  }

  useEffect(() => {
    if (hp <= 0) {
      alert("Meghaltál... :(");
      setHp(maxHp);
      setRewards([]);
      setCurrentCard(randomCardFromDeck());
      setDiceValue(null);
    }
  }, [hp]);

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
        <Player hp={hp} maxHp={maxHp} rewards={rewards} />
      </div>
    </main>
  );
};

export default App;