import { ResponseData } from 'models'
import { action } from 'typesafe-actions'

export function getEpiList () {
  return action('@epi/GET_EPI_LIST')
}

export function setEpiList (epiList: ResponseData[]) {
  return action('@epi/SET_EPI_LIST', {
    epiList
  })
}

export function setEpiListError (errorMessage: string) {
  return action('@epi/SET_EPI_LIST_ERROR', {
    errorMessage
  })
}

export function updateEpiList (data: ResponseData[]) {
  return action('@epi/UPDATE_EPI_LIST', {
    data
  })
}
