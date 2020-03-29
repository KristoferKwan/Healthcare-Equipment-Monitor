import React from 'react'
import clsx from 'clsx'
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Map as MapIcon
} from '@material-ui/icons'
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useToggle } from 'react-use'

import { useUserContext } from '../../contexts/UserContext'
import Sidebar from './Sidebar'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  title: {
    flexGrow: 1
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    padding: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  }
}))

export default function DashboardLayout({ children }) {
  const classes = useStyles()
  const [user, setUser] = useUserContext()
  const [open, handleToggleDrawer] = useToggle(true)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          {!open && (
            <IconButton
              color={'inherit'}
              aria-label={'open drawer'}
              onClick={handleToggleDrawer}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            component={'h1'}
            variant={'h6'}
            color={'inherit'}
            noWrap
            className={classes.title}
          >
            Healthcare Equipment Monitor
          </Typography>
          <IconButton
            component={Link}
            to={'/map'}
            color={'inherit'}
            className={classes.menuButton}
          >
            <MapIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} onToggleDoor={handleToggleDrawer} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.container}>{children}</div>
      </main>
    </div>
  )
}
