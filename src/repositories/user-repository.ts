import { User, UserData } from "../protocols/user-protocol";
import db from "../database";
import httpStatus from "http-status";
import { error } from "console";

export async function InsertUser(user: User) {

  const userOnData = await db.query(`SELECT * FROM users WHERE cpf = $1`,[user.cpf])
 if (userOnData.rowCount && userOnData.rowCount > 0){
    return userOnData.rows[0]

  }

  try {
    // Inserir diretamente - o banco vai validar a constraint UNIQUE
    const userResult = await db.query(`INSERT INTO users (name, description, cpf) 
        VALUES($1, $2, $3)
        RETURNING *`, [user.name, user.description, user.cpf]);
    
    console.log(userResult);
    return userResult.rows[0]; 
    
  } catch (error: any) {
    console.error("Database error:", error);
    
    
    if (error.code === '23505' && error.constraint === 'users_cpf_key') {
      throw {
        error: httpStatus.CONFLICT,
        message: "CPF already in use"
      };
    }
    
    
    throw {
      error: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Database error"
    };
  }
}

export async function GetUser(cpf:string) {
  const user = await db.query(`SELECT * FROM users WHERE cpf=$1`,[cpf])

  if  (user.rowCount == 0){
    throw(
      {
        error: httpStatus.NOT_FOUND,
        message: "user not found"
      }
    )
  }

  const userData: UserData = user.rows[0]
  return userData
  
}