import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Avatar,
  Button,
  Container,
  TextField,
  Grid,
  Typography
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, Link } from 'react-router-dom'
import { useSignUp } from '../../functions/useAPI'
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignUp() {
  const classes = useStyles()
  const history = useHistory()

  const [values, setValues] = useState({
    hospitalId: '',
    username: '',
    password: '',
    passwordConfirm: ''
  })

  const [signUpState, signUp] = useSignUp({
    hospitalId: values.hospitalId,
    username: values.username,
    password: values.password
  })
  const [user, setUser] = useUserContext()

  useEffect(() => {
    if (user.loggedIn) {
      console.log(user)
      history.push(`/info/${user.hospitalId}`)
    }
  }, [user])

  useEffect(() => {
    if (!signUpState.loading && !signUpState.error && !!signUpState.value) {
      let { username, hospitalId } = signUpState.value
      setUser(prev => ({ ...prev, username, hospitalId, loggedIn: true }))
    } else {
      console.log(signUpState)
    }
  }, [signUpState])

  const handleOnChange = key => event => {
    let value = event.target.value
    setValues(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    signUp()
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="hospitalId"
                name="hospitalId"
                variant="outlined"
                type="number"
                required
                fullWidth
                id="hospitalId"
                label="Hospital Id"
                value={values.hospitalId}
                onChange={handleOnChange('hospitalId')}
                autoFocus
              />
            </Grid>
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                value={values.passwordConfirm}
                onChange={handleOnChange('passwordConfirm')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={
              values.password !== values.passwordConfirm || !values.password
            }
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
