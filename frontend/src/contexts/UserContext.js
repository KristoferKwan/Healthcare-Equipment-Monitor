import { createStateContext } from 'react-use'

const DEFAULT_STATE = {
  username: '',
  hospitalId: '',
  loggedIn: false
}

const [useUserContext, UserContextProvider] = createStateContext(DEFAULT_STATE)

export { useUserContext, UserContextProvider }
