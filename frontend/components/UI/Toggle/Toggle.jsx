import cls from './toggle.module.css'


const Toggle = ({variants, state}) => {
  return (
    <div className={cls.toggle}>
      <div
        className={[cls.toggle_button, state.state[0] ? cls.active : null].join(' ')}
        onClick={e => state.set([1, 0])}
      >{variants[0]}</div>
      <div
        className={[cls.toggle_button, state.state[1] ? cls.active : null].join(' ')}
        onClick={e => state.set([0, 1])}
      >{variants[1]}</div>
    </div>
  )
}


export default Toggle
