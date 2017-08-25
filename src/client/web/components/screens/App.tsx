import * as React from 'react';
import {observer} from "mobx-react";
import {observable} from "mobx";
import todoTask1 from "../../../api-sdk/mocks/todo-task/todo-task-1";
import todoTask2 from "../../../api-sdk/mocks/todo-task/todo-task-2";
import {ReactNode, SyntheticEvent} from "react";
import TodoTask from "../../../api-sdk/models/TodoTask";
import {Router, Route, browserHistory} from 'react-router';

export interface TasksScreenProps {

}

export interface TasksScreenState {

}

export enum TodoFilter {
    Completed,
    All,
    NonCompleted
}

const SingleTaskComponent = observer(({task}: { task: TodoTask }) => (
    <li key={`story${task.id}`}>
        <input type="checkbox" checked={task.isCompleted} onChange={event => task.isCompleted = event.target.checked}/>
        <span className={`task ${task.isCompleted ? 'completed' : ''}`}>{task.content}</span>
    </li>
));

const TaskFilterComponent = (props: { children?: ReactNode, filter: TodoFilter, onFilter: (filter: TodoFilter) => void, activeFilter: TodoFilter }) => (
    <li>
        <label>
            {props.children}
            <input checked={props.filter === props.activeFilter} type="radio" onChange={event => {
                if (!event.target.checked) {
                    return;
                }
                props.onFilter(props.filter);
            }}/>
        </label>
    </li>
);

class TasksScreenLogic {
    // constructor() {
    //     // Alternative to field arrow function.
    //     this.onSubmitTask = this.onSubmitTask.bind(this);
    // }

    @observable
    private tasks = [todoTask1, todoTask2];

    @observable
    public newTaskText = '';

    @observable
    public filter = TodoFilter.All;

    public onSubmitTask = (event?: SyntheticEvent<HTMLFormElement>) => {
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
    };

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
}

@observer
export class TasksScreen extends React.Component<TasksScreenProps, TasksScreenState> {

    private logic = new TasksScreenLogic();

    render() {

        const filter = this.logic.filter;

        return (
            <div>
                <h2>Tasks</h2>

                <div>
                    Filter
                    <ul>
                        <TaskFilterComponent activeFilter={filter} filter={TodoFilter.All} onFilter={filter => this.logic.filter = filter}>Todas</TaskFilterComponent>
                        <TaskFilterComponent activeFilter={filter} filter={TodoFilter.Completed} onFilter={filter => this.logic.filter = filter}>Completadas</TaskFilterComponent>
                        <TaskFilterComponent activeFilter={filter} filter={TodoFilter.NonCompleted} onFilter={filter => this.logic.filter = filter}>No completadas</TaskFilterComponent>
                    </ul>
                </div>

                <ul>
                    {this.logic.ShownTasks.map(x => <SingleTaskComponent key={`task-${x.id}`} task={x}/>)}
                </ul>

                <form onSubmit={this.logic.onSubmitTask}>
                    <input type="text" placeholder="Nueva tarea" value={this.logic.newTaskText} onChange={e => this.logic.newTaskText = e.target.value}/>
                    <button type="submit">Agregar</button>
                </form>
            </div>
        );
    }
}

const ScreenA = () => (<div>Screen A</div>);
const ScreenB = () => (<div>Screen B</div>);

export default class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={TasksScreen}/>
                <Route path="/screen-a" component={ScreenA}/>
                <Route path="/screen-b" component={ScreenB}/>
            </Router>
        );
    }
}