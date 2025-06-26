import { error } from "console";
import db from "../database";
import { Recharge, RechargeData } from "../protocols/recharge-protocol";
import  httpStatus  from "http-status";

export async function postRecharge(recharge: Recharge) {

    const number = await db.query(`SELECT * FROM phones WHERE id= $1`,[recharge.id_number])
    
    if (number.rowCount == 0){
        throw(
            {
                error: httpStatus.NOT_FOUND,
                message: "number not found"
            }
        )

    }

    const rechargeOnData = await db.query(`INSERT INTO recharges(value, number_id) VALUES($1, $2) RETURNING *`,[recharge.value, recharge.id_number])
    const rechargeInserted: RechargeData = rechargeOnData.rows[0]
     return rechargeInserted

}

export async function getRechargesByPhone(number:string) {
    let numberId = await db.query<{id: number}>(`SELECT id FROM phones WHERE number=$1`,[number])
    console.log(numberId)
    if (numberId.rowCount == 0){
        throw({
            error: httpStatus.NOT_FOUND,
            message: "number not found"
        })
    }
    
    const rechargesOnDB = await db.query(`SELECT * FROM recharges WHERE number_id = $1`,[numberId.rows[0].id])
    const recharges: RechargeData[] = rechargesOnDB.rows

    return recharges

}