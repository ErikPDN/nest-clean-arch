import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  name?: string;
  description?: string;
  startedDate?: Date | null;
  canceledDate?: Date | null;
  forecastedEndDate?: Date | null;
  finishedDate?: Date | null;
}
