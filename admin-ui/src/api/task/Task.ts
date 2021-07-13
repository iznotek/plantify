import { User } from "../user/User";
import { Project } from "../project/Project";

export type Task = {
  assignedTo?: User | null;
  createdAt: Date;
  estimation: number | null;
  id: string;
  project?: Project;
  startDate: Date;
  status?: "new" | "pending" | "onHold" | "ongoing" | "done";
  title: string;
  updatedAt: Date;
};
