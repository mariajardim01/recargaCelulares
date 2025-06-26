import { InsertNumber, NumberData } from "../protocols/phone-protocol";
import db from "../database";
import { error } from "console";
import httpStatus from "http-status"
import { CarrierData } from "../protocols/carrier";

export async function getCarrier(id:number) {
    let carrierData = await db.query<CarrierData>(`SELECT * FROM carriers WHERE id = $1`,[id])
    if (carrierData.rowCount == 0){
        throw(
            {
                error: httpStatus.NOT_FOUND,
                message: "carrier not found"
            }
        )
    }
     
    carrierData = carrierData.rows[0]
    return carrierData
}