import { Events } from "./events";
export declare class User extends Events {
  readonly id: string;
  readonly avatarId: string;
  readonly name: string;
  readonly color: string;
  constructor(id: string, avatarId: string, name: string, color?: string);
}
