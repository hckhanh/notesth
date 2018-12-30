import { combineReducers } from 'redux'
import loading from './loading'
import note from './note'
import service from './service'

export default combineReducers({ note, service, loading })
