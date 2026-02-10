export class CreateProjectDto {
  name: string;
  description: string;
  startedDate?: Date | null;
  canceledDate?: Date | null;
  forecastedEndDate?: Date | null;
}
