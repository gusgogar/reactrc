import React, {PropTypes} from 'react'
import Message from '../Message'
import styles from './messageList.css'

const propTypes = {
  messages : PropTypes.arrayOf(PropTypes.object).isRequired,
  onRetweet : PropTypes.func.isRequired,
  onFavorites: PropTypes.func.isRequired,
  onReplyTweet: PropTypes.func.isRequired
}

function MessageList ({messages, onRetweet, onFavorites, onReplyTweet}) {
    return (
      <div className={styles.root}>
        {messages.map(msg => {
           return(<Message
             text={msg.text}
             picture={msg.picture}
             displayName={msg.displayName}
             username={msg.userName}
             date={msg.date}
             key={msg.id}
             numRetweets={msg.retweets}
             numFavorites={msg.favorites}
             onRetweet={() => onRetweet(msg.id)}
             onFavorites={() => onFavorites(msg.id)}
             onReplyTweet={() => onReplyTweet(msg.id, msg.userName)}
             />)
           }).reverse()
        }
      </div>
    )
  }

MessageList.propTypes = propTypes
export default MessageList
