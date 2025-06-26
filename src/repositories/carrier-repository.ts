import { CarrierData } from "../protocols/carrier";
import db from "../database";
import httpStatus from "http-status";

export async function getCarrier(id: number): Promise<CarrierData> {
  const result = await db.query<CarrierData>(
    `SELECT * FROM carriers WHERE id = $1`,
    [id]
  );

  if (!result.rowCount || result.rowCount === 0) {
    throw {
      error: httpStatus.NOT_FOUND,
      message: "carrier not found",
    };
  }

  return result.rows[0];
}
