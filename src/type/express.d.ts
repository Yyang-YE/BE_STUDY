import { JwtPayload } from "src/interfaces/jwt.payload";

declare global {
    namespace Express {
      interface Request {
        user?: JwtPayload
      }
    }
  }