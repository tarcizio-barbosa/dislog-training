import { randomUUID } from "crypto";

export class PilarEntity {
  id: string;
  pilarName: string;
  pilarManager: string;
  createdAt: Date;
  updatedAt: Date;
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
