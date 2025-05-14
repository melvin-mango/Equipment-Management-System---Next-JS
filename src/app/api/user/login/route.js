import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // Replace with a secure key

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const filePath = path.join(process.cwd(), "public", "data", "users.json");
        const data = await fs.readFile(filePath, "utf-8");
        const users = JSON.parse(data);

        // Find the user
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
        }

        // Generate a token
        const token = jwt.sign({ id: user.id, role: user.role, fname:user.fname, email:user.email}, SECRET_KEY, { expiresIn: "1h" });

        return NextResponse.json({ token, role: user.role });
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
    }
}