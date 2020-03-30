import React from 'react'
import MUIDataTable from 'mui-datatables'

export default function HospitalTable({ hospitals }) {
  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'hospitalId',
      label: 'Hospital ID',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'state',
      label: 'State',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'county',
      label: 'County',
      options: {
        filter: true,
        sort: true
      }
    }
  ]

  const options = {
    selectableRows: false,
    print: false
  }

  return <MUIDataTable data={hospitals} columns={columns} options={options} />
}
