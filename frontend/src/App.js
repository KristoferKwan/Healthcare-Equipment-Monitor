import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import DashboardLayout from './components/common/DashboardLayout'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import InfoPage from './components/pages/InfoPage'

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
          <BrowserRouter>
            <Switch>
              <Route path={'/info/:id'} component={InfoPage} />
              <Route path={'/map'} component={Map} />
            </Switch>
          </BrowserRouter>
        </DashboardLayout>
      </MuiThemeProvider>
    </>
  )
}
