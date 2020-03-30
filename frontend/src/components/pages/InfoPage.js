import React, { useEffect, useState, useMemo } from 'react'
import { Grid, Typography, Box, Button } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'

import {
  useHospitalInfo,
  useUpdateHospitalSupply
} from '../../functions/useAPI'
import SupplyTable from '../../components/common/SupplyTable'
import BarChart from '../../components/common/Barchart'
import LoadingWrapper from '../common/LoadingWrapper'

const createChartData = (selectedField, supplies) => {
  return supplies.map(({ timestamp, ...supply }) => ({
    name: new Date(timestamp.toString()).toLocaleDateString('en-US'),
    [selectedField]: supply[selectedField]
  }))
}

export default function InfoPage() {
  let { id } = useParams()
  let history = useHistory()

  const [hospitalInfoRes, dispatchInfoReq] = useHospitalInfo(id)
  const [hospitalInfo, setHospitalInfo] = useState(null)
  const [selectedField, setFieldname] = useState('ventilators')
  const [supplyEntry, setSupplyEntry] = useState({})
  const [updateResponse, dispatchUpdate] = useUpdateHospitalSupply(
    id,
    supplyEntry
  )

  const data = useMemo(() => {
    if (!!hospitalInfo && !!hospitalInfo.supplies) {
      return createChartData(selectedField, hospitalInfo.supplies)
    } else {
      return []
    }
  }, [hospitalInfo, selectedField])

  useEffect(() => {
    dispatchInfoReq()
  }, [])

  useEffect(() => {
    if (!hospitalInfoRes.loading && !hospitalInfoRes.error) {
      setHospitalInfo({ ...hospitalInfoRes.value })
    }
  }, [hospitalInfoRes])

  useEffect(() => {
    if (!!hospitalInfo && !!hospitalInfo.supplies) {
      setSupplyEntry(hospitalInfo.supplies[hospitalInfo.supplies.length - 1])
    }
  }, [hospitalInfo])

  const handleChangeSelectedField = newSelectedField => {
    setFieldname(newSelectedField)
  }

  const handleOnChangeFieldValue = key => event => {
    let value = event.target.value
    setSupplyEntry(prev => ({ ...prev, [key]: value }))
  }

  const hasChanged = useMemo(() => {
    if (!!hospitalInfo && !!hospitalInfo.supplies) {
      return Object.entries(hospitalInfo.supplies[0])
        .map(([k, v]) => v !== supplyEntry[k])
        .reduce((prev, curr) => prev || curr, false)
    } else {
      return false
    }
  }, [hospitalInfo, supplyEntry])

  const onSubmit = () => {
    dispatchUpdate().then(() => {
      window.location = `/info/${id}`
    })
  }

  return (
    <>
      <LoadingWrapper loading={!hospitalInfoRes || !!hospitalInfoRes.loading}>
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
              <Button
                disabled={!hasChanged}
                variant={'contained'}
                onClick={onSubmit}
              >
                Submit changes
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <BarChart data={data} fieldname={selectedField} />
          </Grid>
        </Grid>
      </LoadingWrapper>
    </>
  )
}
