import { randomUUID } from "crypto";

export class AreaEntity {
  id: string;
  areaName: string;
  createdAt: Date;
  updatedAt: Date;
  pilarId: string;
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
