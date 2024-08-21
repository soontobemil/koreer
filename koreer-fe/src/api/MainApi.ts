import { HttpClient } from "./HttpClient";

export class MainApi extends HttpClient {
  private static classInstance?: MainApi;

  public static api = MainApi.getInstance().instance;
  public static urlPrefix = "http://localhost:3000";

  private constructor() {
    super(process.env.REACT_APP_BASE_URL as string);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new MainApi();
    }

    return this.classInstance;
  }
}
