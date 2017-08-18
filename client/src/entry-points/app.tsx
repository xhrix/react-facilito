import * as React from 'react'
import * as ReactDOM from "react-dom"

const appElement = document.getElementById('app');

if (!appElement) {
    throw new Error('No #app element.');
}

ReactDOM.render(<div>Soy react >:v</div>, appElement);