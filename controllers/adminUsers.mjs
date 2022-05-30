import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import generateHash from "../generateHash.mjs";

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default function initAdminUsersController(db) {
  const index = async (request, response) => {
    try {
      const { email, password } = request.body;

      const adminUser = await db.AdminUser.findOne({
        where: { email: email, password: generateHash(password) },
      });

      if (!adminUser) {
        response.status(404).send("Error");
      } else {
        const id = adminUser.id;
        const token = jwt.sign({ id }, JWT_SECRET_KEY);
        response.cookie("token", token);
        response.send({ token: token });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkAuthAdmin = async (request, response, next) => {
    try {
      console.log(request.path);

      if (
        request.path.includes("/admin") &&
        request.path !== "/admin/login" &&
        request.path !== "/admin/logout"
      ) {
        console.log("checking auth!!");
        const token = jwt.verify(request.cookies.token, JWT_SECRET_KEY);

        const adminUser = await db.AdminUser.findOne({
          where: { id: token.id },
        });

        adminUser ? next() : response.status(401).send("Invalid auth token");
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index,
    checkAuthAdmin,
  };
}
