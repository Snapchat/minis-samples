import { DataEntry, DataEntryResponse, DataEntryResponseServer } from "./types";
export declare function deserializeData<T>(
  data?: Array<DataEntryResponseServer<string>>
): Array<DataEntryResponse<T>>;
export declare function serializeData<T>(
  data: Array<DataEntry<T>>
): Array<DataEntry<string>>;
