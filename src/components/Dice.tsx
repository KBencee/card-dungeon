const Dice = (props: { 
  value?: number | null;
  onRoll: () => void;
  disabled?: boolean;
}) => {
  const { value = null, onRoll, disabled = false } = props;
  return (
    <div>
        <button className="dice" onClick={onRoll} disabled={disabled} 
        style={{
          background: disabled ? "#ccc" : undefined, 
          color: disabled ? "#666" : undefined,
          }}>
          🎲
        </button>
         <div>{value ?? "-"}</div>
    </div>
  )
}
 
export default Dice