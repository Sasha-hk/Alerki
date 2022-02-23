const API_URL = process.env.API_URL

const UserPicture = ({pictureID, size = "little"}) => {
  if (pictureID) {
    return (
      <img
        className={['user_picture', 'user-picture-size', size].join(' ')}
        src={`${API_URL}/profile/picture/${pictureID}`}
        alt=""
      />
    )
  }
  else {
    return (
      <svg 
        className={['user_picture', 'user-picture-size', size].join(' ')}
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
