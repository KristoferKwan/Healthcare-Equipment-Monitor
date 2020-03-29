import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Checkbox,
  Link,
  Grid,
  Typography
} from '@material-ui/core'

import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import { useSignIn } from '../../functions/useAPI'
import { useUserContext } from '../../contexts/UserContext'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignInPage() {
  const classes = useStyles()
  const history = useHistory()

  const [values, setValues] = useState({
    username: '',
    password: ''
  })

  const [state, signIn] = useSignIn(values)
  const [user, setUser] = useUserContext()

  useEffect(() => {
    if (user.loggedIn) {
      history.push(`/info/${user.hospitalId}`)
    }
  }, [])

  useEffect(() => {
    if (!state.loading && !state.error && !!state.value) {
      let { username, hospitalId } = state.value
      setUser(prev => {
        console.log({ username, hospitalId })
        return { ...prev, username, hospitalId, loggedIn: true }
      })
      history.push(`/info/${hospitalId}`)
    } else {
      console.log(state)
    }
  }, [state])

  const handleOnChange = key => event => {
    let value = event.target.value
    setValues(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    signIn()
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={values.username}
                onChange={handleOnChange('username')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleOnChange('password')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                "Don't have an account? Sign Up"
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
