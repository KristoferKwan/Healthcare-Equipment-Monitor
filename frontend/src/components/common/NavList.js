import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { BrowserRouter, Link } from 'react-router-dom'

const links = [
  {
    to: '/info',
    label: 'Info'
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
          links.map(({ label, ...linkProps }) => (
            <ListItemLink {...linkProps}>
              <ListItemText primary={label} />
            </ListItemLink>
          ))}
      </List>
    </BrowserRouter>
  )
}
