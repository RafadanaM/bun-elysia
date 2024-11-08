import { Elysia } from "elysia";
import UsersController from "@users/users.controller";
import ERROR_CODE_MAP from "@common/errors";
import dbClient from "../db/client";

class App {
  #app: Elysia;
  #port: number;
  constructor(port: number = 8000) {
    this.#app = new Elysia();
    this.#port = port;
    this.#handleInterrupt();
    this.#initPlugins();
    this.#initControllers();
  }

  #initPlugins() {
    this.#app.onError(({ code, error, set }) => {
      set.status = ERROR_CODE_MAP[code];
      return { status: "FAILED", message: error.message, data: null };
    });
  }

  #handleInterrupt() {
    process.on("SIGINT", () => this.#gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => this.#gracefulShutdown("SIGTERM"));
    process.on("uncaughtException", (err) =>
      this.#gracefulShutdown("uncaughtException", err)
    );
    process.on("unhandledRejection", (err) =>
      this.#gracefulShutdown("unhandledRejection", err)
    );
  }

  #initControllers() {
    this.#app.group("/api", (app) => app.use(UsersController));
  }

  async #gracefulShutdown(reason: string, error?: Error | unknown) {
    console.log(`Shutting down the server due to: ${reason}`);
    let code = 0;
    if (error) {
      code = 1;
      console.log(`Error: ${error.toString()}`);
    }
    await dbClient.getInstance().db.destroy();
    process.exit(code);
  }

  listen() {
    this.#app.listen(this.#port, () => {
      console.log(`App is listening on port ${this.#port}`);
    });
  }
}

export default App;
