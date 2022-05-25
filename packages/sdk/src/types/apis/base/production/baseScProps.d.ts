import { App } from "../../../app";
import { Events } from "../../../events";
import * as constants from "../../../constants";
import { User } from "../../../user";
export declare const baseScProps: BaseScProps;
declare type Constants = typeof constants;
export interface BaseScProps extends Constants {
  app: App | undefined;
  version: string;
  App: typeof App;
  Events: typeof Events;
  User: typeof User;
}
export interface Bridge {
  registerHandler(key: string, cb: Function): any;
  callHandler(key: string, data: any, cb: Function): any;
}
export {};
