import * as React from 'react';
import {observer} from "mobx-react";
import {observable} from "mobx";
import todoTask1 from "../../../api-sdk/mocks/todo-task/todo-task-1";
import todoTask2 from "../../../api-sdk/mocks/todo-task/todo-task-2";

export interface TasksScreenProps {

}

export interface TasksScreenState {

}


@observer
export default class TasksScreen extends React.Component<TasksScreenProps, TasksScreenState> {

    @observable
    private tasks = [todoTask1, todoTask2];

    render() {
        return (
            <div>
                <h2>Tasks.</h2>
                <ul>
                    {this.tasks.map(x => (
                        <li key={`story${x.id}`}>
                            <input type="checkbox" checked={x.isCompleted}/>
                            <span>{x.content}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}