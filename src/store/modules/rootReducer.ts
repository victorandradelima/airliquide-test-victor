import { combineReducers } from 'redux'
import { StoreState } from '../createStore'
import epi from './epi-checklist/reducer'

export default combineReducers<StoreState>({
  epi
})
