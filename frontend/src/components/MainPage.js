import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { TextField, Button, Grid, Typography, ButtonGroup } from '@material-ui/core'


function MainPage() {

// const [roomCode, setRoomCode] = useState(null)

// useEffect(() => {
//     await fetch("/api/user-in-room")
//     .then((response) => response.json())
//     .then((data) => {
//         setRoomCode(
//             roomCode = data.code
//         ) 
//     })
//   }, [roomCode]);

    return (
       <Grid container spacing={3}>
           <Grid item xs={12} align="center">
               <Typography variant="h3" compact="h3">
                   House Party
               </Typography>
           </Grid>
           <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to="/join" component={Link}>
                        Join a Room
                    </Button>
                    <Button color="secondary" to="/create" component={Link}>
                        Create a Room
                    </Button>
                </ButtonGroup>
           </Grid>
        </Grid>
    )
}

export default MainPage
