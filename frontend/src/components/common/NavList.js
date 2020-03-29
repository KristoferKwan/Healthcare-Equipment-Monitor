import React from 'react'
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { BrowserRouter, NavLink } from 'react-router-dom'
import { LocalHospital as LocalHospitalIcon } from '@material-ui/icons'

const links = [
  {
    to: '/info',
    label: 'Your Hospital',
    icon: <LocalHospitalIcon />
  }
]

export default function NavList() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}
