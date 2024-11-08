import Elysia from "elysia";
import UsersModule from "./users.module";

const UsersController = new Elysia({ prefix: "/users" })
  .use(UsersModule)

  .get("", async ({ usersService }) => {
    const users = await usersService.getUsers();
    return {
      status: "SUCCESS",
      message: "users fetched successfully",
      data: users,
    };
  });

export default UsersController;
