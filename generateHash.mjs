import jsSHA from "jssha";
import dotenv from "dotenv";

dotenv.config();

const SALT = process.env.SALT;

export default function generateHash(password) {
  const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
  shaObj.update(SALT + password);
  const hash = shaObj.getHash("HEX");
  return hash;
}
