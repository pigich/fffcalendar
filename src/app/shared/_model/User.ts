import { UserEvent } from './UserEvent';

export class User {
    id: number;
    login: string;
    password: string;
    taskList: Array<UserEvent>;
}
