import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { Client } from "pg";

export async function startDb(): Promise<{
  client: Client;
  container: StartedPostgreSqlContainer;
}> {
  const container = await new PostgreSqlContainer("postgres:16")
    .withDatabase("testdb")
    .withUsername("test")
    .withPassword("test")
    .start();

  const client = new Client({
    host: container.getHost(),
    port: container.getPort(),
    user: container.getUsername(),
    password: container.getPassword(),
    database: container.getDatabase(),
  });

  await client.connect();

  return { client, container };
}
