import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = new Project(createProjectDto);
    project.start(new Date());
    return this.projectsRepository.save(project);
  }

  async findAll() {
    const projects = await this.projectsRepository.find();
    return projects;
  }

  async findOne(id: string) {
    return this.projectsRepository.findOneBy({ id });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectsRepository.findOneOrFail({
      where: { id },
    });

    if (updateProjectDto.name !== undefined) {
      project.name = updateProjectDto.name;
    }
    if (updateProjectDto.description !== undefined) {
      project.description = updateProjectDto.description;
    }
    if (updateProjectDto.startedDate !== undefined) {
      project.startedDate = updateProjectDto.startedDate;
    }
    if (updateProjectDto.canceledDate !== undefined) {
      project.canceledDate = updateProjectDto.canceledDate;
    }
    if (updateProjectDto.forecastedEndDate !== undefined) {
      project.forecastedEndDate = updateProjectDto.forecastedEndDate;
    }

    return this.projectsRepository.save(project);
  }

  async remove(id: string) {
    await this.projectsRepository.delete(id);
  }
}
