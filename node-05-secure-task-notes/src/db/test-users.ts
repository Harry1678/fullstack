import { createUser } from "./users.repo";
import bcrypt from "bcrypt";

async function test() {
  const hash = await bcrypt.hash("pass123", 10);

  const id = await createUser(
    "user1@test.com",
    hash,
    "user"
  );

  console.log("Created user ID:", id);
}

test();
