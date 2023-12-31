import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { Task } from 'src/schemas/Task.Schems';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

  async findAll() {
    return this.taskModel.find()
  }

  async create(task: CreateTaskDto) {
    const newTask = new this.taskModel(task);
    await newTask.save()
    return newTask
  }

  async findOne(id: string){
    return this.taskModel.findById(id)
  }

  async deleteOne(id: string){
    return this.taskModel.findByIdAndDelete(id);
  }

  async update(id: string, task: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, task, {new: true});
  }

}
