import * as React from 'react';
import {observer} from "mobx-react";
import {observable} from "mobx";
import LikeCount from '../common/LikeCount';

export interface MainScreenProps {

}

export interface MainScreenState {

}

const FunctionalComponent = ({count}: { count: number }) => <div>Counting: {count}</div>

@observer
export default class MainScreen extends React.Component<MainScreenProps, MainScreenState> {

    @observable
    private count = 0;

    componentDidMount() {
        setInterval(() => ++this.count, 200);
    }

    render() {
        return (
            <div>
                <h2>I'm the main screen component.</h2>
                <FunctionalComponent count={this.count}/>
                <br/>
                <LikeCount howManyLikes={this.count}/>
            </div>
        );
    }
}