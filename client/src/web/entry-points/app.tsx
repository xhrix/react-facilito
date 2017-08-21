/**
 * Entry point for the app.
 *
 * A react app can perfectly live in a single file, however, to keep things organized, I split the react app from the
 * entry point. The entry point is the bridge between the DOM and the react app. It only finds a DOM element where to
 * put the react app into.
 *
 * You can have one or more entry points in you project. If your project is 100% react, you might want only one entry
 * point, however, if your have a Wordpress/Laravel/.NET which are not 100% react projects and only some sections of
 * them require react elements, you can split and organize them in different react sub-apps each with its own entry
 * point.
 */

import * as React from 'react'
import * as ReactDOM from "react-dom"

import App from '../components/screens/App'

const appElement = document.getElementById('app');

if (!appElement) {
    throw new Error('No #app element.');
}

ReactDOM.render(<App/>, appElement);