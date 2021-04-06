import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Botton from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import {Link} from 'react-router-dom'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabelControl from '@material-ui/core/FormControlLabel'
import { Button, FormLabel } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Collapse} from '@material-ui/core'

export default function CreateRoomPage () {

const history = useHistory();

const update = false;
const defaultVotes = 2;

const [guestCanPause, setGuestCanPause] = useState(true)
const [votesToSkip, setVotesToSkip] = useState(defaultVotes)

const handlePauseChange = () => {
  setGuestCanPause(current => !current)
}

const handleVotesChange = (e) => {
  setVotesToSkip(e.target.value)
  // console.log(votesToSkip)
}

// useEffect( () => {
//   console.log(guestCanPause);
// }, [guestCanPause]);

const handleClicked = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      votes_to_skip: votesToSkip,
      guest_can_pause: guestCanPause,
    }),
  };
  await fetch("/api/create-room", requestOptions)
    .then((response) => response.json())
    .then((data) => history.push("/room/" + data.code));
}

const handleUpdateButton = async () => {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      votes_to_skip: votesToSkip,
      guest_can_pause: guestCanPause,
      code: roomCode
    }),
  };
  await fetch("/api/update-room", requestOptions)
    .then((response) => {
      if (response.ok) {
        console.log("Room updated")
      } else {
        console.log("Error updating room")
      }
    }) 
  }

const title = () =>{ 
  update ? "Update Room" : "Create Room";
}

return (
   <div>
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {update ? "Update Room" : "Create Room"}
        </Typography>
      </Grid>
    </Grid>
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">
              Guest Control of Playback State
            </div>
          </FormHelperText>
          <RadioGroup row defaultValue="true" onChange={handlePauseChange}>
            <FormControlLabel 
            value="true" 
            control={<Radio color="primary"/>}
            label="Play/Pause"
            labelPlacement="bottom"
            />
            <FormControlLabel 
            value="false" 
            control={<Radio color="secondary"/>}
            label="No Control"
            labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField 
          onChange={handleVotesChange}
          required={true} type="number" 
          defaultValue={defaultVotes} 
          inputProps={{
            min:1,
            style: {textAlign: "center"}
          }} 
          />
          <FormHelperText>
            <div align="center">
              Votes Requiered to Skip Song
            </div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={handleClicked}>
          Create A Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" to="/join" component={Link}>
          Join A Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  </div>
 )
}

