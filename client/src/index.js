import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './sharedStyles.scss'

// eslint-disable-next-line
const antComponentConfigs = require('./antComponentConfigs')

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
)
