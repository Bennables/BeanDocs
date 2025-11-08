import { defineConfig, env } from "prisma/config";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    engine: "classic",
    datasource: {
        url: env("DATABASE_URL"),
    },
});
const db = new PrismaClient();
export default db;
