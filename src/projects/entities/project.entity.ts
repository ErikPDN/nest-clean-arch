import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum ProjectStatus {
  Pending = 'pending',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

@Entity()
export class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'datetime', nullable: true })
  startedDate: Date | null;

  @Column({ type: 'datetime', nullable: true })
  canceledDate: Date | null;

  @Column({ type: 'datetime', nullable: true })
  finishedDate: Date | null;

  @Column({ type: 'datetime', nullable: true })
  forecastedEndDate: Date | null;

  @Column({ type: 'simple-enum', enum: ProjectStatus })
  status: ProjectStatus;

  constructor(
    props: {
      name: string;
      description: string;
      startedDate?: Date | null;
      canceledDate?: Date | null;
      finishedDate?: Date | null;
      forecastedEndDate?: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
    this.status = ProjectStatus.Pending;

    if (props?.startedDate) {
      this.start(props.startedDate);
    }
  }

  start(startedDate: Date) {
    if (this.status === ProjectStatus.Active) {
      throw new Error('Project is already active.');
    }

    if (this.status === ProjectStatus.Completed) {
      throw new Error('Cannot start completed project');
    }

    if (this.status === ProjectStatus.Cancelled) {
      throw new Error('Cannot start canceled project');
    }

    this.status = ProjectStatus.Active;
    this.startedDate = startedDate;
  }
}
