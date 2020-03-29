import { createStateContext } from 'react-use'

const [useUserContext, UserContextProvider] = createStateContext({
  username: null,
  hospitalId: null
})

export { useUserContext, UserContextProvider }
