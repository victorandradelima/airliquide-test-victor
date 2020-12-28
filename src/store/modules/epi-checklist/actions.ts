import { ResponseData } from 'models'
import { action } from 'typesafe-actions'

export function updateEpiList (data: ResponseData[]) {
  return action('@epi/UPDATE_EPI_LIST', {
    data
  })
}
