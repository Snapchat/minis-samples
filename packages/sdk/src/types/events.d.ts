import { EventCb } from "./types";
declare class EventHandler {
  private _parent;
  private _name;
  callback: EventCb | null;
  scope: any | undefined;
  once: boolean;
  constructor(parent: Events, name: string, callback: EventCb, scope?: any);
  get name(): string;
  unbind(): void;
}
export declare class Events {
  on(name: string, callback: EventCb, scope?: any): EventHandler | undefined;
  once(name: string, callback: EventCb, scope?: any): EventHandler | undefined;
  unbind(name?: string, callback?: EventCb, scope?: any): this;
  emit(name: string, ...args: any[]): this;
}
export {};
