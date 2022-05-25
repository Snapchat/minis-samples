export declare enum Status {
  OK = "OK",
  INVALID_ARGUMENT = "INVALID_ARGUMENT",
  NOT_FOUND = "NOT_FOUND",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}
export declare function codeToStatus(code: number): Status;
export declare enum Scope {
  USER = "USER",
  SESSION = "SESSION",
  APP = "APP",
}
export interface DataEntry<T> {
  key: string;
  value?: T;
}
export interface DataEntryResponseServer<T> {
  entry: DataEntry<T>;
  status: {
    code?: number;
  };
}
export interface DataEntryResponse<T> {
  entry: DataEntry<T>;
  status: {
    code: Status;
  };
}
export interface GetDataResponse<T> {
  responses: Array<DataEntryResponse<T>>;
}
export interface ScanDataResponse<T> {
  responses: Array<DataEntryResponse<T>>;
  cursor?: string;
}
