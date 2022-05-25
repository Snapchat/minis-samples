import { Events } from "./events";
import { User } from "./user";
import { SafeAreaInsets, UserFields } from "./types";
export declare class App extends Events {
  _user?: User;
  _id?: string;
  _context?: string;
  _env?: string;
  _sessionId?: string;
  _conversationSize: number;
  _locale?: string;
  _safeAreaInsets: SafeAreaInsets;
  _windowSafeAreaInsets: SafeAreaInsets;
  _isAgeValid?: boolean;
  private _authToken?;
  private _authTokenExpiration;
  private _discoverableFriends?;
  _volume: number;
  constructor();
  get user(): User | undefined;
  get id(): string | undefined;
  get context(): string | undefined;
  get env(): string | undefined;
  get sessionId(): string | undefined;
  get conversationSize(): number;
  get locale(): string | undefined;
  get safeAreaInsets(): SafeAreaInsets;
  get windowSafeAreaInsets(): SafeAreaInsets;
  get authTokenExpiration(): number;
  get volume(): number;
  get authToken(): string | undefined;
  set authToken(token: string | undefined);
  set isAgeValid(isValid: boolean | undefined);
  get isAgeValid(): boolean | undefined;
  set discoverableFriends(discoverableFriends: UserFields[] | undefined);
  get discoverableFriends(): UserFields[] | undefined;
  updateSession(
    sessionId: string,
    conversationSize: number,
    context: string
  ): void;
}
