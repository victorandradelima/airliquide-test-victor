import { all } from 'redux-saga/effects'
import epiList from './epi-checklist/sagas'

export default function * rootSaga () {
  return yield all([
    epiList
  ])
}
