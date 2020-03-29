import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useUserContext } from '../../contexts/UserContext'

const useStyles = makeStyles(theme => ({
  root: {
    color: 'inherit'
  }
}))

export default function AccountButton() {
  const history = useHistory()
  const [user, _] = useUserContext()
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOnClick = event => {
    if (user.loggedIn) {
      setAnchorEl(event.currentTarget)
    } else {
      history.push('/sign-in')
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton className={classes.root} onClick={handleOnClick}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        open={!!anchorEl}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'bottom'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
      >
        <MenuItem>Logout</MenuItem>
      </Menu>
    </>
  )
}
