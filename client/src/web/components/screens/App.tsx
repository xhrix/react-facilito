/**
 * Example of a simple app.
 */

import * as React from 'react';
import {observer} from "mobx-react";
import {observable} from "mobx";

/**
 * Description of the types for the props of the 'app' component.
 *
 * The type definitions for props of a component should live in the same file of such component.
 */
export interface AppProps {

}

/**
 * Description of the types for the state of the 'app' component.
 *
 * The type definitions for state of a component should live in the same file of such component.
 */
export interface AppState {

}

/**
 * Example of a 'class component'.
 */
@observer
export default class App extends React.Component<AppProps, AppState> {

    @observable
    private count = 1;

    componentDidMount() {
        setInterval(() => ++this.count, 1000);
    }

    render() {
        return (
            <div>
                Hello <World count={this.count}/>

                {/*When a component does not take children, close it immediately, do this:*/}
                <ExampleObserverFunctionalComponent/>
                {/*... and avoid this:*/}
                <ExampleObserverFunctionalComponent></ExampleObserverFunctionalComponent>
            </div>
        );
    }
}

/**
 * Example of a 'functional component'.
 *
 * @param {number} count - Just a number
 */
const World = ({count}: { count: number }) => (
    <span>World for {count}{count === 1 ? 'st' : count === 2 ? 'nd' : 'th'} time!</span>
);

/**
 * You can not put annotations in a 'const' declaration, so, using '@observer' in a functional component won't compile.
 *
 * To solve that, just wrap the whole arrow function between 'observer(' and ')'.
 */
const ExampleObserverFunctionalComponent = observer(() => (
    <br/>
));