import "next-auth";

declare module "next-auth" {
    interface User {
        _id?: string;
        username?: string;
        isAdmin?: boolean;
        logo: string;
        resumeList?: string[];
    }

    interface Session {
        user: User & DefaultSession['user']
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
        username?: string;
        isAdmin?: boolean;
        logo: string;
        resumeList?: string[];
    }
}
