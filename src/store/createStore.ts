import { applyMiddleware, createStore, Middleware, Reducer } from 'redux'
import { EpiAction, EpiState } from './modules/epi-checklist/types'

export interface StoreState {
  epi: EpiState
}

export type StoreAction = EpiAction

export default (reducers: Reducer<StoreState, StoreAction>, middlewares: Middleware[]) => {
  const enhancer = applyMiddleware(...middlewares)
  return createStore(reducers, enhancer)
}
