import React, { useState } from 'react'
import { Grid, Typography, List, ListItem, TextField } from '@material-ui/core'

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

export default function SupplyTable({ supplyEntry, onChangeSelectedField, onChangeFieldValue}) {

  return (
    <Grid container spacing={2}>
      <List>
        {sections.map(({ label, key }) => (
          <ListItem key={key} button onClick={() => onChangeSelectedField(key)}>
            <Grid item xs={12} key={key}>
              <Grid container spacing={4} justify={'space-between'}>
                <Grid item>
                  <Typography variant={'h6'}>{label}</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    type={'number'}
                    value={supplyEntry[key]}
                    onChange={onChangeFieldValue(key)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Grid>
  )
}
