export interface ResponseJSON {
  success: boolean;
  message: string;
  data: object | null;
}

export interface FailureResponseJSON {
  success: boolean;
  message: string;
}
