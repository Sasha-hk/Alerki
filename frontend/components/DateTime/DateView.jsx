const DateView = ({date}) => {
  if (date) {
    const dateView = new Date(date)

    return (
      <div>
        <span>{`${dateView.getDate()}.${dateView.getMonth()}.${dateView.getFullYear()}`}</span>
      </div>
    )
  }
  else {
    return (
      <div></div>
    )
  }
}


export default DateView
