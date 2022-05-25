import { Scope, DataEntry, GetDataResponse, ScanDataResponse } from "./types";
interface AuthTokenResponse {
  token: string;
}
interface SnapCanvasSDK {
  fetchAuthToken: () => Promise<AuthTokenResponse>;
  _outsideSnapchat: () => boolean;
}
export declare class StorageClient {
  private readonly sc;
  private readonly env;
  constructor(sc: SnapCanvasSDK, env?: string);
  private static getPath;
  private doFetch;
  getData<T>(
    scope: Scope,
    collection: string,
    keys: Array<string>
  ): Promise<GetDataResponse<T>>;
  scanData<T>(
    scope: Scope,
    collection: string,
    limit: number,
    cursor?: string
  ): Promise<ScanDataResponse<T>>;
  setData<T>(
    scope: Scope,
    collection: string,
    data: Array<DataEntry<T>>,
    ttlSec?: number
  ): Promise<void>;
  deleteData(
    scope: Scope,
    collection: string,
    keys: Array<string>
  ): Promise<void>;
}
export {};
