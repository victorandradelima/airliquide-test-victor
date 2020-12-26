import axios from 'axios'
import { API_CONFIG } from './api.config'

const api = axios.create(API_CONFIG)

export default api
