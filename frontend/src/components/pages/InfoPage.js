import React, { useEffect, useState, useMemo } from 'react'
import { Grid, Typography, Box, Button } from '@material-ui/core'
import { useParams } from 'react-router-dom'

import { useHospitalInfo } from '../../functions/useAPI'
import SupplyTable from '../../components/common/SupplyTable'
import BarChart from '../../components/common/Barchart'
import { keys } from '@material-ui/core/styles/createBreakpoints'

const data = [
  {
    name: '2020-03-29T21:47:48.673Z',
    ventilators: 134
  }
]

const createChartData = (selectedField, supplies) => {
  return supplies.map(({ timestamp, ...supply }) => ({
    name: new Date(timestamp.toString()).toLocaleDateString('en-US'),
    [selectedField]: supply[selectedField]
  }))
}

export default function InfoPage() {
  let { id } = useParams()

  const state = useHospitalInfo(id)
  const [hospitalInfo, setHospitalInfo] = useState(null)
  const [data, setData] = useState([])
  const [selectedField, setFieldname] = useState('ventilators')
  const [supplyEntry, setSupplyEntry] = useState({})

  useEffect(() => {
    if (!state.loading && !state.error) {
      setHospitalInfo({ ...state.value })
    }
  }, [state])

  useEffect(() => {
    if (!!hospitalInfo && !!hospitalInfo.supplies) {
      setSupplyEntry(hospitalInfo.supplies[0])
    }
  }, [hospitalInfo])

  useEffect(() => {
    if (!!hospitalInfo && !!hospitalInfo.supplies) {
      setData(createChartData(selectedField, hospitalInfo.supplies))
    }
  }, [hospitalInfo, selectedField])

  const handleChangeSelectedField = newSelectedField => {
    setFieldname(newSelectedField)
  }

  const handleOnChangeFieldValue = key => event => {
    let value = event.target.value
    setSupplyEntry(prev => ({ ...prev, [key]: value }))
  }

  const hasChanged = useMemo(() => {
    if (!!hospitalInfo && !!hospitalInfo.supplies) {
      console.log(hospitalInfo.supplies[0])
      console.log(supplyEntry)
      return Object.entries(hospitalInfo.supplies[0])
        .map(([k, v]) => v !== supplyEntry[k])
        .reduce((prev, curr) => prev || curr, false)
    } else {
      return false
    }
  }, [hospitalInfo, supplyEntry])

  return (
    <>
      <Box paddingBottom={3}>
        <Typography variant={'h4'}>Hospital ID: {id}</Typography>
      </Box>
      <Grid container spacing={8}>
        <Grid container item xs={12}>
          {!!hospitalInfo && !!hospitalInfo.supplies && (
            <SupplyTable
              supplyEntry={supplyEntry}
              onChangeSelectedField={handleChangeSelectedField}
              onChangeFieldValue={handleOnChangeFieldValue}
            />
          )}
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Button disabled={!hasChanged} variant={'contained'}>
              Submit changes
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <BarChart data={data} fieldname={selectedField} />
        </Grid>
      </Grid>
    </>
  )
}
