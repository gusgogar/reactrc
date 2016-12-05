import React, { PropTypes, Component} from 'react'
import firebase from 'firebase'
import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'
import uuid from 'uuid'

const propTypes = {
  user : PropTypes.object.isRequired,
  onLogout : PropTypes.func.isRequired
}

class Main extends Component {
    constructor (props) {
        super(props)
        this.state = {
            usernameToReply: '',
            user: Object.assign({}, this.props.user, { retweets: [] }, {favorites: []}),
            openText: false,
            messages: [

            ]
        }
        this.handleOpenText = this.handleOpenText.bind(this)
        this.handleSendText = this.handleSendText.bind(this)
        this.handleCloseText = this.handleCloseText.bind(this)
        this.handleOnRetweet = this.handleOnRetweet.bind(this)
        this.handleOnFavorites = this.handleOnFavorites.bind(this)
        this.handleOnReplyTweet = this.handleOnReplyTweet.bind(this)

    }

    componentWillMount () {
      const mensajesRef = firebase.database().ref().child('messages')
      mensajesRef.on('child_added', (snapshot) => {
        this.setState({
            messages : this.state.messages.concat(snapshot.val())
        })
      })

      mensajesRef.on('child_changed', (snapshot) => {
        let obj = snapshot.val();
        let _mensajes=[]
        this.state.messages.map((msj)=>{
          if (msj.id==obj.id){
            _mensajes.push(obj)
          }else{
            _mensajes.push(msj)
          }
        })
        this.setState({
            messages : _mensajes
        })
      })
      mensajesRef.on('child_removed', (snapshot) => {
        let obj = snapshot.val();
        let _mensajes=[]
        this.state.messages.map((msj)=>{
          if (msj.id==obj.id){
          }else{
            _mensajes.push(msj)
          }
        })
        this.setState({
            messages : _mensajes
        })
      })

    }

    handleOpenText (event) {
        event.preventDefault()
        this.setState({openText: true})
    }

    handleOnRetweet (msgId) {
        let alreadyRetweets = this.state.user.retweets.filter(ret => ret === msgId)
        if (alreadyRetweets.length === 0) {
            let messages= {}
            this.state.messages.map(msg => {
                if (msg.id === msgId) {
                    msg.retweets++
                    messages = msg
                }

            })
            let user = Object.assign({}, this.state.user)
            user.retweets.push(msgId)
            this.setState({user})
            const mensajesRef = firebase.database().ref().child('messages')
            var query = mensajesRef.orderByChild('id').equalTo(msgId)
            query.on('value', (snap) => {
                let obj = {}
                obj['/messages/' + Object.keys(snap.val())[0] + '/retweets'] = messages.retweets
                firebase.database().ref().update(obj)
            })
          }
        }

    handleOnReplyTweet (msgId, usernameToReply) {
        this.setState({openText: true, usernameToReply})
    }

    handleOnFavorites (msgId) {
        let alreadyFavorites = this.state.user.favorites.filter(fav => fav === msgId)
        if (alreadyFavorites.length === 0) {
            let messages = {}
            this.state.messages.map(msg => {
                if (msg.id === msgId) {
                    msg.favorites++
                    messages = msg
                }
                return msg
            })
            let user = Object.assign({}, this.state.user)
            user.favorites.push(msgId)
            this.setState({user})
            const mensajesRef = firebase.database().ref().child('messages')
            var query = mensajesRef.orderByChild('id').equalTo(msgId)
            query.on('value', (snap) => {
                let obj = {}
                obj['/messages/' + Object.keys(snap.val())[0] + '/favorites'] = messages.favorites
                firebase.database().ref().update(obj)
                .then((ev)=>console.log('Hecho'))
                .catch(()=>console.log('Error'))
            })
        }
    }

    handleSendText (event) {
        event.preventDefault()
        let newMessage = {
            id: uuid.v4(),
            userName: this.props.user.email.split('@')[0],
            date: Date.now(),
            displayName: this.props.user.displayName,
            picture: this.props.user.photoURL,
            text: event.target.text.value,
            favorites: 0,
            retweets: 0
        }
        const mensajesRef = firebase.database().ref().child('messages')
        const messageID = mensajesRef.push()
        messageID.set(newMessage)
        this.setState({openText: false})
    }

    handleCloseText(event) {
        event.preventDefault()
        this.setState({openText: false})
    }

    renderopenText() {
        if (this.state.openText) {
            return (<InputText onSendText={this.handleSendText} onCloseText={this.handleCloseText} usernameToReply={this.state.usernameToReply}/>)
        }
    }

    render() {
        return (
            <div>
                <ProfileBar picture={this.props.user.photoURL}
                            username={this.props.user.email.split('@')[0]}
                            onOpenText={this.handleOpenText}
                            onLogout={this.props.onLogout}/> {this.renderopenText()
}
                <MessageList messages={this.state.messages} onRetweet={this.handleOnRetweet} onFavorites={this.handleOnFavorites} onReplyTweet={this.handleOnReplyTweet}/>
            </div>
        )
    }
}

Main.propTypes = propTypes

export default Main
