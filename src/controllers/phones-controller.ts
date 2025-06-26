
import { Request, Response } from "express";
import httpStatus from "http-status";
import { RegisterUserPhone, UserData } from "../protocols/user-protocol";
import { CarrierValidation } from "../services/carrierValidate-service";
import { InsertUser } from "../repositories/user-repository";
import db from "../database";
import { CarrierData } from "../protocols/carrier";
import { GetPhonesByCPF, InsertPhone } from "../repositories/phone-repository";
import { NumberData } from "../protocols/phone-protocol";


export async function registerPhone(req: Request, res: Response) {
  const phoneData: RegisterUserPhone = req.body;

  const carrier: CarrierData = await CarrierValidation(phoneData.carrier)
  
  const user:UserData = await InsertUser({cpf: phoneData.cpf,description: phoneData.description, name: phoneData.name})
  const result = await InsertPhone({carrier_id: carrier.id, user_id: user.id, number: phoneData.number}, user.id)
    res.status(httpStatus.CREATED).send(result);
    return;
}

export async function ListPhonesByCPF(req: Request, res: Response,){
    const phones = await GetPhonesByCPF(req.params.document)
    res.send(phones).status(httpStatus.OK)
    return
}