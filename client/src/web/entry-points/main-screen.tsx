import * as React from 'react'
import * as ReactDOM from "react-dom"

// El nombre de los custom elements debe comenzar con mayuscula.
import MainScreen from '../components/screens/MainScreen'

const appElement = document.getElementById('app');

if (!appElement) {
    throw new Error('No #app element.');
}

ReactDOM.render(<MainScreen/>, appElement);