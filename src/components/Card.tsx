const Card = (props: {
  name: string
  icon: string
  lvl: number
  reward: string
  penalty: string
  idx: number
}) => {


  return (
    <div className="card">
      <div className="card-icon">{props.icon}</div>
      <div className="card-lvl"><p>{props.lvl}. szint</p></div>
      <p>Reward: {props.reward}</p>
      <p>Penalty: {props.penalty}</p>
    </div>
  )
}

export default Card