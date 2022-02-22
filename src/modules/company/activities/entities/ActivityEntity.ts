import { randomUUID } from "crypto";

export class ActivityEntity {
  id: string;
  activityName: string;
  createdAt: Date;
  updatedAt: Date;
  areaId: string;
  userId: string;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
    if (!this.updatedAt) {
      this.updatedAt = new Date();
    }
  }
}
