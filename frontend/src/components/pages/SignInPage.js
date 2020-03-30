import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Grid,
  Typography
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, Link } from 'react-router-dom'

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

  const [signInState, signIn] = useSignIn(values)
  const [user, setUser] = useUserContext()

  useEffect(() => {
    if (user.loggedIn) {
      console.log(user)
      history.push(`/info/${user.hospitalId}`)
    }
  }, [user])

  useEffect(() => {
    if (!signInState.loading && !signInState.error && !!signInState.value) {
      let { username, hospitalId } = signInState.value
      setUser(prev => ({ ...prev, username, hospitalId, loggedIn: true }))
    } else {
      console.log(signInState)
    }
  }, [signInState])

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
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link to="/sign-up" variant="body2">
                "Don't have an account? Sign Up"
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
