import React, {Component} from 'react'
import {HashRouter, Match} from 'react-router'
import firebase from 'firebase'
import 'normalize-css'
import Profile from '../Profile'
import Header from '../Header'
import Main from '../Main'
import Login from '../Login'
import styles from './app.css'


class App extends Component {
  constructor () {
    super()
    this.state = {
      user : {
          email : 'gusgogar@gmail.com',
          displayName : 'Gustavo',
          location : 'La Almunia',
          username : 'gusgogar',
          fotoURL : 'data:image/jpeg;base64,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'

        },
        user : null


      }
      this.handleOnAuth = this.handleOnAuth.bind(this)
      this.handleLogout = this.handleLogout.bind(this)
    }

    componentWillMount () {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({user:user.providerData[0]})
        } else {
            this.setState({user: null})
        }
      })
    }

    handleLogout () {
      firebase.auth().signOut().then(()=>console.log('Te has desconectado')).catch(() => console.error('ERROR'))
    }
    handleOnAuth (){
      const provider = new firebase.auth.GithubAuthProvider()
      firebase.auth().signInWithPopup(provider)
      .then( result => console.log(`Se ha logado ${result.user.email}`))
      .catch(error => console.error("Error" + error))
    }

   render (){
     return (
       <HashRouter>
       <div>
         <Header />
         <Match exactly pattern='/' render={
             ()=> {
               if (this.state.user){
                 return(<Main user={this.state.user} onLogout={this.handleLogout}/>)
               }else{
                 return(<Login onAuth={this.handleOnAuth}/>)
               }
             }
           }/>
         <Match exactly pattern='/profile' render={
               ()=> {
                   return(<Profile picture={this.state.user.photoURL}
                                   username={this.state.user.email.split('@')[0]}
                                   displayName={this.state.user.displayName}
                                   email={this.state.user.email}
                                   location={this.state.user.location}/>)
                 }
               }
             />
           <Match exactly pattern='/user/:username' render={
                   ({params})=> {
                       return (<Profile username={params.username}
                                        displayName={params.username}
                                        />)
                     }
                   }
            />
       </div>
     </HashRouter>

     )
   }
}

export default App
