import React from 'react'
import { Grid, Typography, List, ListItem } from '@material-ui/core'

const sections = [
  {
    label: 'Ventilators',
    key: 'ventilators'
  },
  {
    label: 'Masks',
    key: 'masks'
  },
  {
    label: 'Goggles',
    key: 'goggles'
  },
  {
    label: 'Gloves',
    key: 'gloves'
  },
  {
    label: 'Gowns',
    key: 'gowns'
  },
  {
    label: 'Negative Pressure Rooms',
    key: 'nprs'
  }
]

export default function SupplyTable({ supplyEntry, toggleChartData }) {
  return (
    <Grid container spacing={2}>
      <List>
      {sections.map(({ label, key }) => (
        <ListItem key={key} button onClick={() => toggleChartData(key)}>
          <Grid item xs={12} key={key}>
            <Grid container spacing={4} justify={'space-between'}>
              <Grid item xs={8} md={'auto'}>
                <Typography variant={'h6'}>{label}</Typography>
              </Grid>
              <Grid item>
                <Typography variant={'body1'}>{supplyEntry[key]}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      ))}
      </List>
    </Grid>
  )
}
