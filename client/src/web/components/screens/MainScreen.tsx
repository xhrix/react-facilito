import * as React from 'react';
import {observer} from "mobx-react";
import {observable} from "mobx";

export interface MainScreenProps {

}

export interface MainScreenState {

}

@observer
export default class MainScreen extends React.Component<MainScreenProps, MainScreenState> {

    @observable
    private count = 0;

    componentDidMount() {
        setInterval(() => ++this.count, 200);
    }

    render() {
        return (
            <div>I'm the main screen component ({this.count}).</div>
        );
    }
}