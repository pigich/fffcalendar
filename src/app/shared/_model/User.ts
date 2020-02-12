import { UserTask } from './UserTask';

export class User {
    id: number;
    login: string;
    password: string;
    taskList: Array<UserTask>;
}
