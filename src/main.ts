import './app.css'
import App from './App.svelte'
import './firebase'

const app = new App({
  target: document.getElementById('app'),
})

export default app
