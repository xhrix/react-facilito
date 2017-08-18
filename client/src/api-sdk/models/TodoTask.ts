import {observable} from "mobx";

export default class TodoTask {
    public id = 0;
    public content = '';

    @observable
    public isCompleted = false;
}