import React from 'react'
import { Link, Typography } from '@material-ui/core'
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer
} from 'recharts'

export default function Barchart({
  data,
  fieldname,
  width = '80%',
  height = 200
}) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={fieldname} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}
