import React, {PropTypes} from 'react'
import styles from './profile.css'

const propTypes = {
  picture: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  location  : PropTypes.string.isRequired
}

function Profile ({picture, username, displayName , email, location}) {
      return(
      <div className={styles.root}>
        <img className={styles.avatar} src={picture} />
        <span className={styles.nombre}> {displayName}</span>
        <ul className={styles.data}>
          <li>
            <span className='fa fa-user'>{username}</span>
          </li>
          <li>
            <span className='fa fa-envelope'>{email}</span>
          </li>
          <li>
            <span className='fa fa-map-marker'>{location}</span>
          </li>
        </ul>

      </div>
    )
}

Profile.propTypes = propTypes
export default Profile
