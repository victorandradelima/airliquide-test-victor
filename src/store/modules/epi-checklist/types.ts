import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { ResponseData } from 'models'

export type EpiAction = ActionType<typeof actions>

export interface EpiState {
  readonly data: ResponseData[]
  readonly epiList: any[]
  readonly errorMessage: string
}
