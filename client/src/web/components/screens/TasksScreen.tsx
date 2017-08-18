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

export enum TodoFilter {
    Completed,
    All,
    NonCompleted
}


@observer
export default class TasksScreen extends React.Component<TasksScreenProps, TasksScreenState> {

    @observable
    private tasks = [todoTask1, todoTask2];

    @observable
    private newTaskText = '';

    @observable
    private filter = TodoFilter.All;

    private onSubmitTask(event?: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        if (this.newTaskText === '') {
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

    get ShownTasks() {
        switch (this.filter) {
            case TodoFilter.Completed:
                return this.tasks.filter(x => x.isCompleted);
            case TodoFilter.NonCompleted:
                return this.tasks.filter(x => !x.isCompleted);
            default:
                return this.tasks;
        }
    }

    render() {
        return (
            <div>
                <h2>Tasks</h2>

                <div>
                    Filter
                    <ul>
                        <li>
                            <label>
                                Todas
                                <input
                                    checked={this.filter === TodoFilter.All} type="radio"
                                    onChange={event => this.filter = TodoFilter.All}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                Completadas
                                <input
                                    checked={this.filter === TodoFilter.Completed} type="radio"
                                    onChange={event => this.filter = TodoFilter.Completed}
                                />
                            </label>
                        </li>
                        <li>
                            <label>
                                No completadas
                                <input
                                    checked={this.filter === TodoFilter.NonCompleted} type="radio"
                                    onChange={event => this.filter = TodoFilter.NonCompleted}
                                />
                            </label>
                        </li>
                    </ul>
                </div>

                <ul>
                    {this.ShownTasks.map(x => (
                        <li key={`story${x.id}`}>
                            <input type="checkbox" checked={x.isCompleted} onChange={event => x.isCompleted = event.target.checked}/>
                            <span className={`task ${x.isCompleted ? 'completed' : ''}`}>{x.content}</span>
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