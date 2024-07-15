export interface ResponseJSON {
  success: boolean;
  message: string;
  data?: null | any | {
    userData?: {
      id: string | null;
      userName: string | null;
      displayName: string | null;
      email: string | null;
    }
  };
}
