import { Request, Response } from "express";
import httpStatus from "http-status";
import { GetUser } from "../repositories/user-repository";
import { GetPhonesByCPF } from "../repositories/phone-repository";
import { getCarrier } from "../repositories/carrier-repository"; 
import { getRechargesByPhone } from "../repositories/recharge-repository";
import { NumberFromDB } from "../protocols/phone-protocol";

export async function SummaryByCPF(req: Request, res: Response): Promise<void> {
  const cpf: string = req.params.document;

  try {
    const user = await GetUser(cpf);

    if (!user) {
      res.status(httpStatus.NOT_FOUND).send("User not found.");
      return;
    }

    const phones = await GetPhonesByCPF(cpf);
    const AllPhones: Array<{
      number: string;
      carrier: { id: number; name: string; code: number };
      recharges: any[];
    }> = [];

    for (let i = 0; i < phones.length; i++) {
      const phonesData: NumberFromDB = phones[i];
      
      // Get carrier data - this should return the actual carrier object, not QueryResult
      const carrierData = await getCarrier(phonesData.carrier_id);

      if (!carrierData) {
        // If carrier not found, continue to next phone
        continue;
      }

      const rechargesList = await getRechargesByPhone(phonesData.number);

      // Ensure actualRecharges is always an array
      const actualRecharges = Array.isArray(rechargesList) ? rechargesList : [];

      AllPhones.push({
        number: phonesData.number,
        carrier: {
          id: carrierData.id,
          name: carrierData.name,
          code: carrierData.code,
        },
        recharges: actualRecharges,
      });
    }

    const result = {
      document: cpf,
      user: {
        id: user.id,
        name: user.name,
      },
      phones: AllPhones,
    };
    
    res.status(httpStatus.OK).send(result);

  } catch (error: any) {
    console.error("Error in summaryByCPF:", error);
    
    // Handle custom error objects with error and message properties
    if (error && typeof error === "object" && "error" in error && "message" in error) {
      res.status(error.error as number).send(error.message);
      return;
    }
    
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("An unexpected error occurred.");
  }
}