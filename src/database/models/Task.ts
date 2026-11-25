import Realm from 'realm';

export type TaskPriority = 'Low' | 'Medium' | 'High';

export class Task extends Realm.Object<Task> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  notes!: string;
  priority!: TaskPriority;
  isCompleted!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      notes: { type: 'string', default: '' },
      priority: { type: 'string', default: 'Medium' },
      isCompleted: { type: 'bool', default: false },
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}
