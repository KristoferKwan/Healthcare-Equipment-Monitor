import React from 'react'
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { BrowserRouter, Link } from 'react-router-dom'
import { LocalHospital as LocalHospitalIcon } from '@material-ui/icons'

const links = [
  {
    to: '/info',
    label: 'Your Hospital',
    icon: <LocalHospitalIcon />
  }
]

const ListItemLink = props => {
  return <ListItem button component={Link} {...props} />
}

export default function NavList() {
  return (
    <BrowserRouter>
      <List>
        {!!links &&
          links.map(({ label, icon, ...linkProps }) => (
            <ListItemLink {...linkProps}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemLink>
          ))}
      </List>
    </BrowserRouter>
  )
}
