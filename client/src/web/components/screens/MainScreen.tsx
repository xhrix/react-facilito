import * as React from 'react';
import {observer} from "mobx-react";
import {observable} from "mobx";
import LikeCount from '../common/LikeCount';
import {ReactNode} from "react";

export interface MainScreenProps {

}

export interface MainScreenState {

}

const FunctionalComponent = ({count}: { count: number }) => <div>Counting: {count}</div>;

const ComponentWithChildren = ({count, children}: { count: number, children?: ReactNode }) => (
    <div style={{color: 'red'}}>{children}</div>
);

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
                <ComponentWithChildren count={this.count}>
                    <div>Soy un div</div>
                    <FunctionalComponent count={this.count}/>
                </ComponentWithChildren>
            </div>
        );
    }
}