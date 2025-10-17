const Dice = (props: { 
  value?: number | null;
   
  onRoll: () => void }) => {
  const { value = null, onRoll } = props;
  return (
    <div>
        <button className="dice" onClick={onRoll}>🎲</button>
        <div>{value ?? "-"}</div>
    </div>
  )
}

export default Dice