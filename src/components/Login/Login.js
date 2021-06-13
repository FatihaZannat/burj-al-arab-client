import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';
import {userContext} from '../../App'
import { useHistory, useLocation } from 'react-router';


const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext)
      let history = useHistory();
      let location = useLocation();
      let { from } = location.state || { from: { pathname: "/" } };
   
  
  if(firebase.apps.length === 0 ){
      firebase.initializeApp(firebaseConfig);
    }
  
    const handleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const {displayName, email} = result.user;
    const singInUser ={name:displayName, email}
    setLoggedInUser(singInUser)
    storeAuthToken()
    history.replace(from)
  
    // ...
  }).catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage)
    
  });

    }

    const storeAuthToken = () => {
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then(function(idToken) {
        console.log(idToken);
        sessionStorage.setItem('token', idToken)
      }).catch(function(error) {
        // Handle error
      });
    }

    return (

        <div>
            <h1>This is Login</h1>
            <button onClick={handleSignIn}>Google sing in</button>
        </div>
    );
};

export default Login;