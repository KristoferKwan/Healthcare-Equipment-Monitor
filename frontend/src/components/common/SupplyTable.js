import React from 'react'
import { Grid, Typography } from '@material-ui/core'

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
    label: 'Eyewear',
    key: 'eyewear'
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

export default function SupplyTable({ supplyEntry }) {
  return (
    <Grid container spacing={2}>
      {sections.map(({ label, key }) => (
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
      ))}
    </Grid>
  )
}
