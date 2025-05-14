import { NextResponse } from "next/server";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import { Sequelize } from "sequelize";

// Initialize Sequelize
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./session.sqlite", // Store session data in SQLite
});

// Initialize Session Store
const SequelizeSessionStore = SequelizeStore(session.Store);
const store = new SequelizeSessionStore({ db: sequelize });

// Sync the database
store.sync();

// Configure Express Session
const sessionMiddleware = session({
    secret: "your_secret_key", // Replace with a secure key
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    },
});

// Middleware Wrapper for Next.js
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export async function POST(req) {
    const { email, role } = await req.json();

    // Create a session
    const res = NextResponse.next();
    await runMiddleware(req, res, sessionMiddleware);

    req.session.user = { email, role };
    return NextResponse.json({ success: true });
}

export async function GET(req) {
    const res = NextResponse.next();
    await runMiddleware(req, res, sessionMiddleware);

    if (req.session.user) {
        return NextResponse.json({ user: req.session.user });
    } else {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
}

export async function DELETE(req) {
    const res = NextResponse.next();
    await runMiddleware(req, res, sessionMiddleware);

    req.session.destroy();
    return NextResponse.json({ success: true });
}