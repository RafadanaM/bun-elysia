/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string>;

export interface Users {
  createdAt: Generated<Timestamp>;
  email: string;
  firstName: string;
  id: string;
  lastName: string | null;
  password: string;
  profilePicture: string | null;
  updatedAt: Generated<Timestamp>;
}

export interface DB {
  users: Users;
}
