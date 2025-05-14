import {NextResponse} from "next/server";
import path from "path";
import {promises as fs} from "fs";
import { error } from "console";

export async function GET () {
    try{
        const filePath = path.join(process.cwd(), "public", "data", "users.json");
        const data = await fs.readFile(filePath, "utf-8");
        const userData = JSON.parse(data);

        return NextResponse.json(userData);
        } catch(error){
            return NextResponse.json({error: "Failed to load User data"}, {status:500})
        }
}

export async function PUT (req) {
    try{
        const {id, updatedUser} = await req.json();
        const filePath = path.join(process.cwd(), "public", "data", "users.json");
        const data = await fs.readFile(filePath, "utf-8");
        const userData =JSON.parse(data);
        const userIndex = userData.findIndex((user)=> user.id === id);

        if(userIndex === -1){
            return NextResponse.json({error:"User not found"},{status:404});
        }

        userData[userIndex] = {... userData[userIndex], ...updatedUser};

        await fs.writeFile(filePath, JSON.stringify(userData, null, 2),"utf-8")
        return NextResponse.json({success: true});
    }catch (error){
        return NextResponse.json({error: "Failed to update user data"}, {status: 500});
    }
}

export async function DELETE (req) {
    try{
        const filePath = path.join(process.cwd(),"public","data","users.json");
        const {id} = await req.json();
        const data = await fs.readFile(filePath,"utf-8");

        const userData = JSON.parse(data);

        const updatedUser = userData.filter((user) => user.id !== id);

        

        await fs.writeFile(filePath, JSON.stringify(updatedUser, null, 2), "utf-8");

        return NextResponse.json({success:true});


    } catch(error){
        return NextResponse.json({error: "Failed to delete user data"},{status:500})
    }
}

export async function POST(req) {
    try {
        const newUser = await req.json(); // Parse the new user data from the request body

        const filePath = path.join(process.cwd(), "public", "data", "users.json");
        const data = await fs.readFile(filePath, "utf-8"); // Read the existing users
        const userData = JSON.parse(data);

        // Check if the user ID already exists
        const userExists = userData.some((user) => user.id === newUser.id);
        if (userExists) {
            return NextResponse.json({ error: "User ID already exists" }, { status: 400 });
        }

        // Add the new user to the user data
        userData.push(newUser);

        // Write the updated user data back to the file
        await fs.writeFile(filePath, JSON.stringify(userData, null, 2), "utf-8");

        return NextResponse.json(newUser); // Return the newly added user
    } catch (error) {
        console.error("Error adding user:", error);
        return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
    }
}