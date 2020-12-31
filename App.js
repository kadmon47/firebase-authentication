import React from 'react';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


 firebase.initializeApp({
  apiKey:"key",
  authDomain : "domain"
})
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isSignedIn : false,
      lastSignedIn : ""
    }
    
  }
  uiConfig = {
    signInFlow : "popup",
    signInOptions : [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks : {
      signInSuccess : () => false
    }
  }

  componentDidMount = () => {        
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn : !!user,lastSignedIn : user.metadata.lastSignInTime});
      console.log("user",user);
    })

  }
  render(){
    return(
      <div className="App">
        {
        this.state.isSignedIn ?
          <div>
            <h1>Signed IN!</h1>
            <button onClick={()=>firebase.auth().signOut()}>SignOut</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img src={firebase.auth().currentUser.photoURL}/>
            <h1>{this.state.lastSignedIn}</h1>
            </div>
          
          :
          <StyledFirebaseAuth 
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
          />
        }
      </div>
    );
  }
}

export default App;
