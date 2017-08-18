import * as React from 'react';
import {observer} from "mobx-react";
import {observable} from "mobx";
import LikeCount from '../common/LikeCount';
import {ReactNode} from "react";
import mockBrittanyStory from "../../../api-sdk/mocks/story/brittany-story";
import mockClaudioStory from "../../../api-sdk/mocks/story/claudio-story";

export interface NewsFeedProps {

}

export interface NewsFeedState {

}

const stories = [mockBrittanyStory, mockClaudioStory];

@observer
export default class NewsFeed extends React.Component<NewsFeedProps, NewsFeedState> {

    render() {
        return (
            <div>
                <h2>Stories.</h2>
                <ul>
                    {stories.map(x => <li key={`story${x.id}`}>{x.content}</li>)}
                </ul>
            </div>
        );
    }
}