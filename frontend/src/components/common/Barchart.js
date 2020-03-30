import React from 'react'
import { Link, Typography } from '@material-ui/core'
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts' 

export default function Barchart({ data, fieldname }) {
  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={fieldname} fill="#8884d8" />
    </BarChart>
  )
}