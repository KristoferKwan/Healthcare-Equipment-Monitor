import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import { useParams } from 'react-router-dom'

import { useHospitalInfo } from '../../functions/useAPI'
import SupplyTable from '../../components/common/SupplyTable'

export default function InfoPage() {
  let { id } = useParams()

  const state = useHospitalInfo(id)
  const [hospitalInfo, setHospitalInfo] = useState(null)
  useEffect(() => {
    if (!state.loading && !state.error) {
      setHospitalInfo({ ...state.value })
    }
  }, [state])
  console.log(hospitalInfo)

  return (
    <>
      <Box paddingBottom={3}>
        <Typography variant={'h4'}>Hospital ID: {id}</Typography>
      </Box>
      <Grid item container xs={12} md={6}>
        {!!hospitalInfo && !!hospitalInfo.supplies && (
          <SupplyTable supplyEntry={hospitalInfo.supplies[0]} />
        )}
      </Grid>
    </>
  )
}
