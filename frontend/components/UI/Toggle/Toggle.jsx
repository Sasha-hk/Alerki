import cls from './toggle.module.css'


const Toggle = ({variants, state}) => {
  return (
    <div className={cls.toggle}>
      <div
        className={[cls.toggle_button, state.state ? cls.active : null].join(' ')}
        onClick={e => state.set(true)}
      >{variants[0]}</div>
      <div
        className={[cls.toggle_button, !state.state ? cls.active : null].join(' ')}
        onClick={e => state.set(false)}
      >{variants[1]}</div>
    </div>
  )
}


export default Toggle
