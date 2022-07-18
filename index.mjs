import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import methodOverride from 'method-override';
import dotenv from 'dotenv';
import bindRoutes from './routes.mjs';

import initAdminUsersController from './controllers/adminUsers.mjs';
import db from './models/index.mjs';
const AdminUsersController = initAdminUsersController(db);

dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const app = express();
app.use(
  cors({
    credentials: true,
    origin: [
      FRONTEND_URL,
      process.env.SECONDARY_FRONTEND_URL,
      'http://localhost:3000',
    ],
  })
);
app.set('trust proxy', 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'session_secret',
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 60000000,
      secure: process.env.NODE_ENV === 'production',
    },
    resave: true,
    saveUninitialized: false,
    ttl: 60 * 60 * 24 * 30,
  })
);

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());

// CUSTOM MIDDLEWARE
app.use(AdminUsersController.checkAuthAdmin);

bindRoutes(app);

const PORT = process.env.PORT || 3004;
app.listen(PORT);
