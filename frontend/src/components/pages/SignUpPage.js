import React, { useState } from 'react'
import axios from 'axios'
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography
} from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

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

  const [values, setValues] = useState({
    hospitalId: null,
    userId: null,
    password: null,
    passwordConfirm: null
  })

  const handleOnChange = key => event => {
    let value = event.target.value
    setValues(prev => ({...prev, [key]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://localhost:8080/api/user/signup', {
      username: values.username,
      password: values.password,
      hospital: values.hospitalId
    }).then(response => {
      if (response.username) {
        // update App.js state
        // update the state to redirect to home
        window.location = '/info/'
      }
    }).catch(error => {
      window.alert(error)
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
                id="userId"
                label="User ID"
                name="userId"
                autoComplete="userId"
                value={values.userId}
                onChange={handleOnChange('userId')}
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
            disabled={values.password !== values.passwordConfirm || !values.password }
            onClick={console.log()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
