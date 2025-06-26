import  httpStatus  from "http-status"
import db from "../database"


export async function CarrierValidation(carrier: string) {
    const promiceCarrier  = await db.query("SELECT * FROM carriers WHERE name = $1",[carrier])
  console.log(promiceCarrier)
  if (promiceCarrier.rowCount == 0){
    throw({
      error: httpStatus.NOT_FOUND,
      message: "Carrier not found"
    })
  }
  return promiceCarrier.rows[0]
}