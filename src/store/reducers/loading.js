import { fromJS, Map } from 'immutable'

const initState = Map({})

export default function(state = initState, action) {
  const matches = action.type.match(/(\w+)_(VALIDATING|SUCCESS|WARNING|ERROR)/)
  if (matches) {
    const [, requestName, status] = matches
    return state.set(
      requestName,
      fromJS({ status: status.toLowerCase(), payload: action.payload })
    )
  } else {
    return state
  }
}
