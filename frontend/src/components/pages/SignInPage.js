import React, {useState} from 'react'
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

export default function SignIn(props) {
  const classes = useStyles()

  const [values, setValues] = useState({
    hospitalId: null,
    userId: null,
    password: null
  })

  const handleOnChange = key => event => {
    let value = event.target.value
    setValues(prev => ({...prev, [key]: value}))
  }

  const handleSubmit = () => {}
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
                autoComplete="hospitalId"
                name="hospitalId"
                variant="outlined"
                required
                fullWidth
                id="hospitalId"
                label="Hospital Id"
                autofocus
                value={values.hospitalId}
                onChange={handleOnChange('hospitalId')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userId"
                label="User Id"
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
