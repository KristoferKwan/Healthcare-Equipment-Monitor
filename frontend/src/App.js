import React from 'react'
import DashboardLayout from './components/common/DashboardLayout'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  props: {
    MuiButton: {
      size: 'small',
      variant: 'outlined',
      color: 'primary'
    }
  }
})

export default function App() {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <DashboardLayout>
          
        </DashboardLayout>
      </MuiThemeProvider>
    </>
  )
}
