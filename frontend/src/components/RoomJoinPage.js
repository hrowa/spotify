import React, {useState} from "react";
import { TextField, Button, Grid, Typography } from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom'

export default function RoomJoinPage () {

  const history = useHistory()

  const [roomCode, setRoomCode] = useState("")
  const [textError, setTextError] = useState("")

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value)
  }

  const roomButtonPressed = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    await fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          history.push(`/room/${roomCode}`);
        } else {
          setTextError("No Such Room")}
        })
    }
  
  return( 
    <Grid container spacing={1} >
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField 
          error={textError}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={textError}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button 
        variant="contained" 
        color="primary" to="/" 
        onClick={roomButtonPressed}
        >
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button 
        variant="contained" 
        color="primary"
        to="/create" 
        component={Link}>
        Create Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button 
        variant="contained" 
        color="secondary" to="/" 
        component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
    )
}
