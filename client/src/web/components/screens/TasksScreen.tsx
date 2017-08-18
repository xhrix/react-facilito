import * as React from 'react';
import {observer} from "mobx-react";
import {observable} from "mobx";
import todoTask1 from "../../../api-sdk/mocks/todo-task/todo-task-1";
import todoTask2 from "../../../api-sdk/mocks/todo-task/todo-task-2";
import {SyntheticEvent} from "react";
import TodoTask from "../../../api-sdk/models/TodoTask";

export interface TasksScreenProps {

}

export interface TasksScreenState {

}


@observer
export default class TasksScreen extends React.Component<TasksScreenProps, TasksScreenState> {

    @observable
    private tasks = [todoTask1, todoTask2];

    @observable
    private newTaskText = '';

    private onSubmitTask(event?: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        if(this.newTaskText === '') {
            alert('Escribe un texto');
            return;
        }

        const newTask = new TodoTask();
        newTask.id = Date.now();
        newTask.content = this.newTaskText;
        newTask.isCompleted = false;

        this.newTaskText = '';
        this.tasks.push(newTask);
    }

    render() {
        return (
            <div>
                <h2>Tasks.</h2>
                <ul>
                    {this.tasks.map(x => (
                        <li key={`story${x.id}`}>
                            <input type="checkbox" checked={x.isCompleted} onChange={event => null}/>
                            <span>{x.content}</span>
                        </li>
                    ))}
                </ul>

                <form onSubmit={this.onSubmitTask.bind(this)}>
                    <input type="text" placeholder="Nueva tarea" value={this.newTaskText} onChange={e => this.newTaskText = e.target.value}/>
                    <button type="submit">Agregar</button>
                </form>
            </div>
        );
    }
}