import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// GET method to fetch borrowed equipment with hodapp as blank
export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "public", "data", "equipment.json");
        const data = await fs.readFile(filePath, "utf-8");
        const equipmentData = JSON.parse(data);

        // Filter items with status "borrowed" and hodapp ""
        const filteredData = [];
        for (const category in equipmentData) {
            if (equipmentData[category]) {
                filteredData.push(
                    ...equipmentData[category].filter(
                        (item) => item.status === "borrowed" && item.hodapp === ""
                    )
                );
            }
        }

        return NextResponse.json(filteredData);
    } catch (error) {
        console.error("Error fetching equipment data:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch equipment data." },
            { status: 500 }
        );
    }
}

// POST method to approve or reject equipment requests
export async function POST(req) {
    try {
        const { id, equipment, action } = await req.json();

        // Validate input
        if (!id || !equipment || !action) {
            return NextResponse.json(
                { success: false, error: "Missing required fields: id, equipment, or action." },
                { status: 400 }
            );
        }

        const validActions = ["approved", "rejected"];
        if (!validActions.includes(action)) {
            return NextResponse.json(
                { success: false, error: "Invalid action. Must be 'approved' or 'rejected'." },
                { status: 400 }
            );
        }

        const filePath = path.join(process.cwd(), "public/data/equipment.json");
        const data = await fs.readFile(filePath, "utf-8");
        const equipmentData = JSON.parse(data);

        // Update the hodapp field for all specified equipment items
        let equipmentFound = false;
        for (const category in equipmentData) {
            equipmentData[category] = equipmentData[category].map((item) => {
                if (item.borid === id && equipment.includes(item.name)) {
                    equipmentFound = true;
                    return {
                        ...item,
                        hodapp: action, // Update hodapp field
                    };
                }
                return item;
            });
        }

        if (!equipmentFound) {
            return NextResponse.json(
                { success: false, error: "No matching equipment found." },
                { status: 404 }
            );
        }

        // Write the updated data back to the file
        await fs.writeFile(filePath, JSON.stringify(equipmentData, null, 2), "utf-8");

        return NextResponse.json({ success: true, message: `Equipment ${action} successfully.` });
    } catch (error) {
        console.error("Error updating equipment:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update equipment." },
            { status: 500 }
        );
    }
}