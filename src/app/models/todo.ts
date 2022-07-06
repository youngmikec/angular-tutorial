export interface Todo {
    id: number;
    title: string;
    isCompleted: boolean;
    status: string;
    startDate?: Date;
    dueDate?: Date;
}
