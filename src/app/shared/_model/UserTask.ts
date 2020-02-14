export class UserTask {
    public _id: string;
    constructor(
        public name: string = '',
        public startDate: Date = new Date(Date.now()),
        public finishDate: Date = new Date(Date.now()),
        public comment: string = '',
    ) { }
}
