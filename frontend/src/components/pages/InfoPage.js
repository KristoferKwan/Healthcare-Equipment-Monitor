import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'

export default function InfoPage() {
  let { id } = useParams()
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant={'h4'}>Hospital ID: {id}</Typography>
        </Grid>
      </Grid>
    </>
  )
}
