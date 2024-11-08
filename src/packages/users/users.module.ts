import Elysia from "elysia";
import UsersService from "./users.service";
import dbClient from "@db/client";

const UsersPlugin = new Elysia({ name: "users_module" }).decorate({
  usersService: new UsersService(dbClient.getInstance().db),
});

export default UsersPlugin;
