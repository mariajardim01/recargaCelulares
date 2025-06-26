import { Request, Response } from "express";
import { Recharge } from "../protocols/recharge-protocol";
import { getRechargesByPhone, postRecharge } from "../repositories/recharge-repository";
import httpStatus from "http-status"


export async function InsertRecharge (req:Request, res: Response) {
    const data:Recharge =req.body
    
    const rechargeOnData = await postRecharge({id_number: data.id_number , value: data.value})
    
    res.status(httpStatus.CREATED).send(rechargeOnData)
    return
}

export async function ListRecharges(req:Request, res: Response) {
    const number:string = req.params.number

    const result = await getRechargesByPhone(number)
    res.status(httpStatus.OK).send(result)
    return
    
}