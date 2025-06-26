
import { Request, Response } from "express";
import { GetUser } from "../repositories/user-repository";
import { GetPhonesByCPF } from "../repositories/phone-repository";
import { getCarrier } from "../repositories/carrier-repository"; 
import { NumberData, NumberFromDB } from "../protocols/phone-protocol";
import { getRechargesByPhone } from "../repositories/recharge-repository";
import httpStatus from "http-status";
import db from "../database"; 

export async function SummaryByCPF(req: Request, res: Response) {
  const cpf: string = req.params.document;

  try { 
    const user = await GetUser(cpf);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).send("User not found.");
    }

    let phones = await GetPhonesByCPF(cpf);
    const AllPhones = [];

    for (let i = 0; i < phones.length; i++) {
      const phonesData: NumberFromDB = phones[i];
      const carrierData = await getCarrier(phonesData.carrier_id); 

 
      let rechargesList = await getRechargesByPhone(phonesData.number);

      let actualRecharges = [];
      if (rechargesList && rechargesList.rows) { 
        actualRecharges = rechargesList.rows;
      } else if (Array.isArray(rechargesList)) { 
        actualRecharges = rechargesList;
      }


      let phoneOnArray = {
        number: phonesData.number, 
        carrier: {
          id: carrierData.id, 
          name: carrierData.name,
          code: carrierData.code
        },
        recharges: actualRecharges 
      };
      AllPhones.push(phoneOnArray);
    }

    const result = {
      document: cpf,
      user: { 
        id: user.id,
        name: user.name,
        
      },
      phones: AllPhones
    };

    res.status(httpStatus.OK).send(result);

  } catch (error) {
    console.error("Error in summaryByCPF:", error);
    if (error && typeof error === 'object' && 'error' in error && 'message' in error) {
      return res.status(error.error as number).send(error.message);
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("An unexpected error occurred.");
  }
}