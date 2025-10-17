const Buttons = (props: {
    onFight?: () => void;
    onFlee?: () => void;
}) => {
const { onFight, onFlee } = props;
  return (
    <div>      
        <div className="btns-container">
            <p>
                <button className="btn" onClick={onFight}>FIGHT ⚔</button>
            </p>
            <p>
                <button className="btn" onClick={onFlee}>FLEE 👣</button>   
            </p>
      </div></div>
  )
}

export default Buttons