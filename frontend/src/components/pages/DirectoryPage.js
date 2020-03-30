import React from 'react'

import HospitalTable from '../common/HospitalTable'
import LoadingWrapper from '../common/LoadingWrapper'
import { useAllHospitals } from '../../functions/useAPI'

export default function DirectoryPage() {
  const hospitalsState = useAllHospitals()

  return (
    <LoadingWrapper
      loading={!hospitalsState || !!hospitalsState.loading || !!hospitalsState.error}
    >
      <HospitalTable hospitals={hospitalsState.value} />
    </LoadingWrapper>
  )
}
