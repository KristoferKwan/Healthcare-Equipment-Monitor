import { createStateContext } from 'react-use'

const DEFAULT_STATE = {
  username: 'USERNAME',
  hospitalId: '11613604',
  loggedIn: true
}

const [useUserContext, UserContextProvider] = createStateContext(DEFAULT_STATE)

export { useUserContext, UserContextProvider }