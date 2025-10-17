import { useMemo } from "react";

type PlayerProps = {
  hp?: number; 
  maxHp?: number; 
  rewards?: string[]; 
};

const Player = ({ hp = 5, maxHp = 5, rewards = [] }: PlayerProps) => {
  const attackFromRewards = useMemo(
    () => rewards.reduce((acc, reward) => acc + (reward.includes("⚔") ? 1 : 0), 0),
    [rewards]
  );

  const hearts = Array.from({ length: maxHp }, (_, i) => (i < hp ? "❤️" : "💀"));

  return (
    <div className="barok">
      <div className="hearts">
        {hearts.map((hp, i) => (
          <span key={i}>
            {hp}
          </span>
        ))}
      </div>

      <div>
        {attackFromRewards > 0 ? (
          Array.from({ length: attackFromRewards }).map((_, i) => (
            <span key={i}>
              ⚔️
            </span>
          ))
        ) : (
          <span></span>
        )}
      </div>

      <div className="leforditottCards">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: i * 8,
              left: i * 6,
              right: 0,
              bottom: 0,
              borderRadius: 14,
              background: "#f7c7cc",
              border: "3px solid #222",
              transform: `rotate(${i === 1 ? "-3deg" : i === 2 ? "3deg" : "0deg"})`,
              boxShadow: "4px 6px 0 rgba(0,0,0,0.08)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Player;