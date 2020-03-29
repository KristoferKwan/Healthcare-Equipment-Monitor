import React from 'react'
import clsx from 'clsx'
import {
  makeStyles,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  List,
  ListItemText,
  ListItemIcon
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import { NavLink } from 'react-router-dom'

import { useUserContext } from '../../contexts/UserContext'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7)
    }
  }
}))

export default function Sidebar({ open, onToggleDoor }) {
  const classes = useStyles()
  const [user, _] = useUserContext()
  const links = [
    {
      to: !!user.hospitalId ? `/info/${user.hospitalId}` : '/sign-in',
      label: 'Your Hospital',
      icon: <LocalHospitalIcon />
    }
  ]
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={onToggleDoor}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider variant={'fullWidth'} />
      <List>
        {links.map(({ label, icon, to }) => (
          <ListItem
            button
            component={NavLink}
            to={to}
            key={to}
            activeClassName={'Mui-selected'}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
