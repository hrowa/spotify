import React, { useState, useEffect } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from './Room'
import { TextField, Button, Grid, Typography, ButtonGroup } from '@material-ui/core'
import MainPage from './MainPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";


export default function HomePage () {

  const [roomCode, setRoomCode] = useState(null)

  useEffect(() => {
     fetch("/api/user-in-room")
    .then((response) => response.json())
    .then((data) => {
        setRoomCode(data.code)
        console.log(data.code)
    })
  }, [roomCode]);

  const clearRoomCode = () => {
    setRoomCode(null)
  }

  return (
      <Router>
        <Switch>
          <Route exact path="/">  
            {roomCode ? <Redirect to={`/room/${roomCode}`} /> : <MainPage /> }
          </Route>
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/create" component={CreateRoomPage} />
          <Route path='/room/:roomCode' component={Room} />
          <Route path="/room/:roomCode" render={() => {
            <Room {...props} clearRoomCode={clearRoomCode} />
          }} />
        </Switch>
      </Router>
    );
  }

  
