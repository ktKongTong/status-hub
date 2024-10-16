import {generateId} from "lucia";
import bcrypt from 'bcryptjs'
export const createUid =()=> {
  return createId("u");
}

export const createId = (prefix?: string,size?: number)=> {
  if(prefix) {
    return prefix + "_" + generateId(size ?? 15);
  }
  return generateId(15)
}

export function generateVerificationCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}




export async function hashPassword(password: string):Promise<string> {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export async function verifyPassword(password: string, hash: string):Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

