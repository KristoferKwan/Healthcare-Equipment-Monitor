import React from 'react'
import clsx from 'clsx'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MapIcon from '@material-ui/icons/Map'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
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
import AccountButton from './AccountButton'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarButton: {
    color: theme.palette.common.white
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
            to={'/sign-in'}
            className={classes.toolbarButton}
          >
            <AccountCircleIcon />
          </IconButton>
          <AccountButton />

          <IconButton
            component={Link}
            to={'/map'}
            className={classes.toolbarButton}
          >
            <MapIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar user={user} open={open} onToggleDoor={handleToggleDrawer} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.container}>{children}</div>
      </main>
    </div>
  )
}
