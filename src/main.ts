import './app.css'
import App from './App.svelte'
import './api/firebase/firebase'
import axios from 'axios'

axios.defaults.withCredentials = true

const app = new App({
  target: document.getElementById('app'),
})

export default app
