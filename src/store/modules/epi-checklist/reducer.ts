import { EpiAction, EpiState } from './types'

const INITIAL_STATE: EpiState = {
  data: [],
  epiList: [],
  errorMessage: ''
}

export default function epi (state = INITIAL_STATE, actions: EpiAction): EpiState {
  switch (actions.type) {
    case '@epi/UPDATE_EPI_LIST':
      return {
        ...state,
        data: actions.payload.data
      }
    case '@epi/SET_EPI_LIST':
      return {
        ...state,
        epiList: actions.payload.epiList
      }
    case '@epi/SET_EPI_LIST_ERROR':
      return {
        ...state,
        errorMessage: actions.payload.errorMessage
      }
    default:
      return state
  }
}
