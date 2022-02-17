import { randomUUID } from "crypto";

export class UserEntity {
  id: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  createdAt: Date;
  updatedAt: Date;

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
