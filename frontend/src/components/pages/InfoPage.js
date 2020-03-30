import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import { useParams } from 'react-router-dom'

import { useHospitalInfo } from '../../functions/useAPI'
import SupplyTable from '../../components/common/SupplyTable'
import BarChart from '../../components/common/Barchart'

const data = [
  {
    name: '2020-03-29T21:47:48.673Z',
    ventilators: 134
  }
]

const createChartData = async (fieldname, supplies) => {
  const result = supplies.map(supply => {
    let datapoint = {}
    datapoint['name'] = new Date(
      supply.timestamp.toString()
    ).toLocaleDateString('en-US')
    datapoint[fieldname] = supply[fieldname]
    return datapoint
  })
  console.log('result', result)
  return result
}

export default function InfoPage() {
  let { id } = useParams()

  const state = useHospitalInfo(id)
  const [hospitalInfo, setHospitalInfo] = useState(null)
  const [data, setData] = useState([])
  const [fieldname, setFieldname] = useState('ventilators')

  useEffect(() => {
    if (!state.loading && !state.error) {
      setHospitalInfo({ ...state.value })
    }
  }, [state])

  useEffect(() => {
    const onHospitalInfo = () => {
      if (hospitalInfo !== null) {
        createChartData(fieldname, hospitalInfo.supplies).then(result => {
          setData(result)
        })
      }
    }
    onHospitalInfo()
  }, [hospitalInfo])

  useEffect(() => {
    console.log('new data!', data)
  }, [data])

  useEffect(() => {
    if (hospitalInfo !== null) {
      createChartData(fieldname, hospitalInfo.supplies).then(result => {
        setData(result)
      })
    }
  }, [fieldname])

  const toggleChartData = fname => {
    console.log('toggling to', fname)
    setFieldname(fname)
  }

  return (
    <>
      <Box paddingBottom={3}>
        <Typography variant={'h4'}>Hospital ID: {id}</Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {!!hospitalInfo && !!hospitalInfo.supplies && (
            <SupplyTable
              supplyEntry={hospitalInfo.supplies[0]}
              toggleChartData={key => toggleChartData(key)}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <BarChart data={data} fieldname={fieldname} />
        </Grid>
      </Grid>
    </>
  )
}
