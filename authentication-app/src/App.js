import * as React from 'react';
import {  Button, Container, Grid, Typography } from '@mui/material'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from "./Component/Configaration/Configaration";
const app = initializeApp(firebaseConfig)






function App() {
  const [user, setUser] = React.useState({
    isSingedIN: false,
    name: "",
    email: ''
  })
  const provider = new GoogleAuthProvider();
  const handleBtn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {

        const { displayName, email } = result.user;
        const singedInUser = {
          isSingedIN: true,
          name: displayName,
          email: email
        }
        setUser(singedInUser)

      }).catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const singOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      const user = {
        isSingedIN:false,
        name:'',
        email:''
      }
      setUser(user)
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2} sx={{background:'black',color:'#fff'}}>
        <Grid item xs={10}>
        {
        user.isSingedIN ? <Button onClick={() => {singOut() }}>SingOut</Button>
          : <Button onClick={() => { handleBtn() }}>SingIn</Button>
          }
        </Grid>
        <Grid item xs={2}>
        {
        user.isSingedIN && <Typography>{user.name}</Typography> 
        }
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
