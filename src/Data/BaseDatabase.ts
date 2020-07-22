import dotenv from "dotenv";
import knex from "knex";
import Knex from "knex";

dotenv.config();

export abstract class BaseDataBase {

  //protected abstract table: string;

  private static connection: Knex | null = null;

  protected getConnection(): Knex {
    if (BaseDataBase.connection === null) {
        BaseDataBase.connection = knex({
        client: "mysql",
        connection: {
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT || "3306"),
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
        },
      });
    }

    return BaseDataBase.connection;
  }

  public static async destroyConnection(): Promise<void> {
    if (BaseDataBase.connection) {
      await BaseDataBase.connection.destroy();
    }
  };

  public async destroyConnection():Promise<void> {
    await BaseDataBase.destroyConnection()
  }
}