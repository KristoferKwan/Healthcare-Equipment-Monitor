import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import DashboardLayout from './components/common/DashboardLayout'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import InfoPage from './components/pages/InfoPage'
import MapPage from './components/pages/MapPage'
import SignUpPage from './components/pages/SignUpPage'
import SignInPage from './components/pages/SignInPage'

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
              <Route path={'/map'} component={MapPage} />
              <Route path={'/sign-up'} component={SignUpPage} />
              <Route path={'/sign-in'} component={SignInPage} />
            </Switch>
          </BrowserRouter>
        </DashboardLayout>
      </MuiThemeProvider>
    </>
  )
}
