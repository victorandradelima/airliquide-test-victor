import { api } from '../../../infra'
import { takeLatest, call, put, all } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export function * epiListReceive ({ payload }: ActionType<typeof actions.updateEpiList>) {
  yield put(actions.setEpiListError(''))
  try {
    const response = yield call(api.get, 'epilist?key=52d6c330')
    yield put(actions.setEpiList(response.data))
  } catch (error) {
    yield put(actions.setEpiListError(error.message ?? 'Houve um erro inexperado'))
  }
}

export default all([
  takeLatest('@epi/GET_EPI_LIST', epiListReceive)
])
