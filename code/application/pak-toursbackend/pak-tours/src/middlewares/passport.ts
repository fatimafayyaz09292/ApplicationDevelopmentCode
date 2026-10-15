import { JWT_SECRET } from "../controllers/auth.controller.js";
import passportJwt from "passport-jwt";
import passport, { PassportStatic } from "passport";
import { Request } from "express";
import { PrismaClient } from "@prisma/client"; // Import Prisma Client

// Initialize Prisma client
const prisma = new PrismaClient();
const { Strategy } = passportJwt;

const cookieExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies?.jwt;
  }

  return jwt;
};

const optionsCookie = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_SECRET,
};

export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(optionsCookie, async (payload:any, done:any) => {
      try {
        // Use Prisma to find the user by ID
        const user = await prisma.user.findUnique({
          where: { id: payload.userId },
        });

        if (user) {
          return done(null, user); // User found
        } else {
          return done(null, false); // User not found
        }
      } catch (error) {
        console.error("Error finding user:", error);
        return done(null, false); // Handle errors and reject authentication
      }
    })
  );
};
