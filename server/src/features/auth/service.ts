import bcrypt from "bcrypt";
import { findUser, saveUser } from "./repository.js";

export async function createUser(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await saveUser(username, hashedPassword);
}

export async function validateUser(username: string, password: string) {
  const user = await findUser(username);
  if (!user ) return null;
  
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}