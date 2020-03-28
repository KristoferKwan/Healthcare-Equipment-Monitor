import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'

import axios from 'axios'
import { useHospitalInfo } from '../../functions/useAPI'
import { useParams } from 'react-router-dom'
import { useAsync } from 'react-use'

export default function InfoPage() {
  let { id } = useParams()

  let state = useHospitalInfo(id)
  console.log(state)

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
