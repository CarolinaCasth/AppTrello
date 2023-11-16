import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, inject } from "@angular/core";
import { Task } from "src/app/core/tasks/entities/task";
import { TaskRepository } from "src/app/core/tasks/interfaces/task.repository";

const API_URL = 'https://api.trello.com/1/';
const ID_LIST = '653acd242f0ae8f2ba37ba0b';

@Injectable({providedIn: 'root'})
export class TaskTrelloService implements TaskRepository {

    constructor(private http: HttpClient){}

    async createTask(task: Task): Promise<any> {
        const data ={
            idList: ID_LIST,
            name: task.nombre,
            desc: task.descripcion
        };

        return await this.http.post(API_URL + 'cards', data).toPromise();
    }
    async getTask(): Promise<Task[]> {
        const data = await this.http.get(API_URL + 'lists/' + ID_LIST + '/cards').toPromise();
        
        if(Array.isArray(data)){
            const list: Task[] = data.map(card => ({
                id: card.id,
                nombre: card.name,
                descripcion: card.desc,
                prioridad: 'Alta',
                estado: true
            }))
            return list;
        }
        return [];
    }
    async getTaskById(id: string): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    updateTask(id: string, updatedTask: Task): boolean {
        try {
            const data = {
                name: updatedTask.nombre,
                desc: updatedTask.descripcion
            };
         
            this.http.put(API_URL + 'cards/' + id, data).toPromise();
            return true;
        } catch (error) {
            console.error("Error al actualizar la tarjeta:", error);
            return false;
        }
    }
    deleteTask(id: string): boolean {
        try {
            this.http.delete(API_URL + 'cards/' + id).toPromise();
            return true;
        } catch (error) {
            console.error("Error al eliminar la tarjeta:", error);
            return false;
        }
    }
}