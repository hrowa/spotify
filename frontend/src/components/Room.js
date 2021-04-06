import React, {useState, useEffect, useMemo} from 'react'
import { TextField, Button, Grid, Typography, ButtonGroup } from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom'
import CreateRoomPage from './CreateRoomPage'
import MusicPlayer from './MusicPlayer'

export default function Room ({...props}, {clearRoomCode}) {

    const history = useHistory();

    const [song, setSong] = useState()
    const [votesToSkip, setVotesToSkip] = useState(2)
    const [isHost, setIsHost] = useState(true)
    const [guestCanPause, setGuestCanPause] = useState(true)
    const [showSettings, setShowSettings] = useState(false)
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false)

    const roomCode = props.match.params.roomCode;

    // const authenticateSpotify = () => {
    //     fetch("/spotify/is-authenticated")
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setSpotifyAuthenticated(data.status);
    //         console.log(data.status);
    //         if (!data.status) {
    //           fetch("/spotify/get-auth-url")
    //             .then((response) => response.json())
    //             .then((data) => {
    //               window.location.replace(data.url);
    //             });
    //         }
    //       });
    //   }

    const authenticateSpotify = () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                        'Accept': 'application/json'},
        }
        fetch("/spotify/is-authenticated", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setSpotifyAuthenticated(data.status);
            // console.log(data.status);
            if (!data.status) {
              fetch("/spotify/get-auth-url")
                .then((response) => response.json())
                .then((data) => {
                  window.location.replace(data.url);
                });
            }
          });
      }

    const getRoomDetails = async () => {
        await fetch('/api/get-room' + '?code=' + roomCode)
       .then((response) => {
           if (!response.ok) {
            // clearRoomCode();
            history.push('/')
           }
       return response.json()
       })
       .then((data) => {
           setVotesToSkip(data.votes_to_skip),
           setGuestCanPause(data.guest_can_pause),
           setIsHost(data.is_host)
       })
       if (isHost) {
           authenticateSpotify()
       }
   }
   
    const getCurrentSong = () => {
        fetch('/spotify/current-song', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'}
            })
            .then((response) => {
            if (!response.ok){
                return {};
            } else {
                return response.json();
            }
        }).then((data) => {
            setSong(data);
            console.log(data)
        })
    }

    getRoomDetails();

    useEffect(() => { 
        const interval = setInterval(() => {getCurrentSong()}, 1000);
        return () => clearInterval(interval)
        console.log(song); 
    },[song])

    
    const leaveButtonPressed = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }
        await fetch("/api/leave-room", requestOptions)
        .then ((_response) => {
            // clearRoomCode();
            history.push('/')
        })
    }

  return (
    <> 
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
                Room Code: {roomCode}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <Typography variant="h6" component="h4">
                Host: {String(isHost)}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <MusicPlayer {...song} />   
        </Grid>
        <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
            Leave Room
        </Button>
        </Grid>
    </Grid>
    </>
    )
}