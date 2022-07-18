import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateHash } from './helperFunctions.mjs';

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default function initAdminUsersController(db) {
  const login = async (request, response) => {
    try {
      const { email, password } = request.body;

      const adminUser = await db.AdminUser.findOne({
        where: { email: email, password: generateHash(password) },
      });

      if (!adminUser) {
        response.status(404).send('Error');
      } else {
        const id = adminUser.id;
        const token = jwt.sign({ id, role: 'admin' }, JWT_SECRET_KEY);
        // response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Credentials', true);
        response.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        );
        response.cookie('token', token, {
          sameSite: 'none',
          secure: true,
          // domain:
          //   process.env.NODE_ENV === 'production'
          //     ? 'https://supercrimp.co'
          //     : '',
        });
        response.send({ token: token });
      }
    } catch (error) {
      response.status(403).send('Wrong login details provided');
    }
  };

  const logout = async (request, response) => {
    try {
      response.clearCookie('token');
      response.send('Logout success');
    } catch (err) {
      response.status(500).send('Something went wrong :(');
      console.log(err);
    }
  };

  const checkAuthAdmin = async (request, response, next) => {
    try {
      if (
        request.path.includes('/admin') &&
        request.path !== '/admin/login' &&
        request.path !== '/admin/logout'
      ) {
        console.log('checking auth!!');

        const { role } = jwt.verify(request.cookies.token, JWT_SECRET_KEY);

        if (role !== 'admin') {
          throw 'error';
        }
      }
      next();
    } catch (error) {
      console.log(error);
      response.status(401).send('No Access');
    }
  };

  return {
    login,
    logout,
    checkAuthAdmin,
  };
}
