const API_URL = process.env.API_URL

const UserPicture = ({pictureID, size = "little", ...props}) => {
  if (pictureID) {
    return (
      <img
        src={`${API_URL}/profile/picture/${pictureID}`}
        className={['user_picture', 'user-picture-size', size, props.className].join(' ')}
        alt=""
      />
    )
  }
  else {
    console.log(12)
    return (
      <svg 
        className={['plug_user_picture', 'user-picture-size', size, props.className].join(' ')}
        viewBox="0 0 29 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="14.5" cy="14.5" r="14.5" />
      </svg>
    )
  }
}


export default UserPicture
