import { withTransaction } from '../database/transaction';
import { ProjectRepository } from '../repositories/project.repository';
import { TaskRepository } from '../repositories/task.repository';
import { pool } from '../database/index';

export class ProjectService {
  private projectRepo = new ProjectRepository();
  private taskRepo = new TaskRepository(pool);

  async createProjectWithTasks(
    name: string,
    tasks: string[]
  ) {
    return withTransaction(async (client) => {
    
      const project = await this.projectRepo.create(client, name);

    
      for (const title of tasks) {
        
        // if (title === 'FAIL') throw new Error('Forced failure');

        await this.taskRepo.createForProject(
          client,
          title,
          project.id
        );
      }

      return {
        projectId: project.id,
        taskCount: tasks.length
      };
    });
  }
  
  
}
