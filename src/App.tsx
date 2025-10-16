import Card from "./components/Card";
import cardsData from "../public/cards.json";
import Buttons from "./components/Buttons";
import Dice from "./components/Dice";

const App = () => {
  const randomCard = cardsData[Math.floor(Math.random() * cardsData.length)];

  return (
    <main>
      <div className="cards-container">
          <Card
          idx={0} 
          name={randomCard.enemyName}
          icon={randomCard.enemyIcon}
          lvl={randomCard.level}
          reward={randomCard.reward}
          penalty={randomCard.penalty}
          />
      </div>
      <div>
        <Dice />
        <Buttons />
      </div>
    </main>
  )
}

export default App