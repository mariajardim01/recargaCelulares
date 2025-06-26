import { InsertNumber, NumberData, NumberFromDB } from "../protocols/phone-protocol";
import db from "../database";
import { error } from "console";
import httpStatus from "http-status"

export async function InsertPhone(phone:InsertNumber, user_id: number)  {

    const phoneONData =await db.query(`SELECT * FROM phones WHERE number = $1`, [phone.number])
    console.log(phoneONData)
    
   if (phoneONData.rowCount && phoneONData.rowCount > 0){
        throw({
            error: httpStatus.CONFLICT,
            message: "this number is already in use"
        })
    } 

    const phonesOfUserOnData =await db.query(`SELECT ALL * FROM phones WHERE user_id = $1`, [user_id])
    if (phonesOfUserOnData.rowCount && phonesOfUserOnData.rowCount >= 3){
        throw({
            error: httpStatus.CONFLICT,
            message: "User has reached the limit of phone numbers (maximum 3)"
        })
    } 

    const phoneInserted = await db.query(`INSERT INTO phones (number, carrier_id ,user_id) 
    VALUES ($1,$2,$3)
    RETURNING *`,[phone.number,phone.carrier_id,phone.user_id])

    const dataInserted:NumberData = phoneInserted.rows[0]

    return dataInserted
}

export async function GetPhonesByCPF(cpf:string) {
    const userId = await db.query<{id: number}>(`SELECT id from users WHERE cpf = $1 `,[cpf])

    if ( userId.rowCount == 0){
         return []
    }

    const Id = userId.rows[0].id;

    const phones = await db.query<NumberFromDB>(`SELECT * FROM phones WHERE user_id = $1`, [Id])
    
    
    return phones.rows
    
}