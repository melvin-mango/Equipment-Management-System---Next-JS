import {NextResponse} from "next/server";
import path from "path";
import { promises as fs} from "fs";

export async function GET () {
    try {
        const filePath = path.join(process.cwd(), "public","data","equipment.json");
        const data = await fs.readFile(filePath, "utf-8");
        const equipmentData = JSON.parse(data);

        return NextResponse.json(equipmentData);
    }
    catch(error){
        return NextResponse.json({error: "Failed to load equipment data"}, {status:500});
    }
}

export async function PUT (req) {
    try{
        const {id , category, updatedItem} = await req.json();

        const filePath = path.join(process.cwd(), "public", "data", "equipment.json");
        const data = await fs.readFile(filePath, "utf-8");
        const equipmentData = JSON.parse(data);

        const categoryItems = equipmentData[category];
        const itemIndex = categoryItems.findIndex((item) => item.id === id);
        
        if (itemIndex === -1) {
            return NextResponse.json({error: "item not found"}, {status:404});
        }
        
        categoryItems[itemIndex] = {...categoryItems[itemIndex], ...updatedItem};

        await fs.writeFile(filePath, JSON.stringify(equipmentData, null, 2), "utf-8")
        return NextResponse.json({success : true});

    }catch(error){
        return NextResponse.json({error: "Failed to update equipment data"}, {status: 500});
    }
}

export async function DELETE (req) {
    try{
        const filePath = path.join(process.cwd(), "public", "data", "equipment.json");
        const {id, category} = await req.json();
        
        const data = await fs.readFile(filePath, "utf-8");
        const equipmentData = JSON.parse(data);

        const categoryItems = equipmentData[category];
        const updatedItems = categoryItems.filter((item) => item.id !== id);
        equipmentData[category] = updatedItems;

        await fs.writeFile(filePath, JSON.stringify(equipmentData, null, 2), "utf-8");

        return NextResponse.json({success : true});
    } catch(error){
        return NextResponse.json({error:"Failed to delete equipment data"}, {status:500});
    }
}

export async function POST(req) {
    try {
        const { category, newItem } = await req.json();

        const filePath = path.join(process.cwd(), "public", "data", "equipment.json");
        const data = await fs.readFile(filePath, "utf-8");
        const equipmentData = JSON.parse(data);

        if (!equipmentData[category]) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        equipmentData[category].push(newItem);

        await fs.writeFile(filePath, JSON.stringify(equipmentData, null, 2), "utf-8");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error adding equipment:", error);
        return NextResponse.json({ error: "Failed to add equipment" }, { status: 500 });
    }
}