import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IconButton, Typography, Popover } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useUserContext } from '../../contexts/UserContext'

export default function AccountButton() {
  const history = useHistory()
  const [user, _] = useUserContext()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOnClick = event => {
    if (user.loggedIn) {
      console.log('l')
      setAnchorEl(event.currentTarget)
    } else {
      history.push('/sign-in')
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const AccountMenu = () => {
    return (
      <Popover
        open={!!anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Typography>{user.username}</Typography>
      </Popover>
    )
  }

  return (
    <IconButton onClick={handleOnClick}>
      <AccountCircleIcon />
    </IconButton>
  )
}
