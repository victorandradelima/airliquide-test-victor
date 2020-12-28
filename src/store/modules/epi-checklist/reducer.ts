import { EpiAction, EpiState } from './types'

const INITIAL_STATE: EpiState = {
  data: []
}

export default function epi (state = INITIAL_STATE, actions: EpiAction): EpiState {
  switch (actions.type) {
    case '@epi/UPDATE_EPI_LIST':
      return {
        ...state,
        data: actions.payload.data
      }
    default:
      return state
  }
}
