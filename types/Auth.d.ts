import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface UserExtended extends User {
    accessToken?: string;
    role?: string;
}

interface SessionExtended extends Session {
    accessToken?: string;
}

interface JWTExtended extends JWT {
    user?: UserExtended;
}

interface ILogin {
    username: string;
    password: string;
}

export type { UserExtended, SessionExtended, JWTExtended, ILogin };
