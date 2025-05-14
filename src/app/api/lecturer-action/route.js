import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// GET method to fetch borrowed equipment with lecapp as blank
export async function GET(req) {
    try {
        const filePath = path.join(process.cwd(), process.env.EQUIPMENT_FILE_PATH || "public/data/equipment.json");
        const data = await fs.readFile(filePath, "utf-8");
        const equipmentData = JSON.parse(data);

        // Filter items with status "borrowed" and lecapp ""
        const filteredData = [];
        for (const category in equipmentData) {
            if (equipmentData[category]) {
                filteredData.push(
                    ...equipmentData[category].filter(
                        (item) => item.status === "borrowed" && item.lecapp === ""
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
        const { id, equipmentName, action } = await req.json();

        // Validate input
        if (!id || !equipmentName || !action) {
            return NextResponse.json(
                { success: false, error: "Missing required fields: id, equipmentName, or action." },
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

        const filePath = path.join(process.cwd(), process.env.EQUIPMENT_FILE_PATH || "public/data/equipment.json");
        const data = await fs.readFile(filePath, "utf-8");
        const equipmentData = JSON.parse(data);

        // Update the lecapp field for the specified equipment
        let equipmentFound = false;
        for (const category in equipmentData) {
            const equipment = equipmentData[category].find(
                (item) => item.borid === id && item.name.toLowerCase() === equipmentName.toLowerCase()
            );
            if (equipment) {
                equipment.lecapp = action; // Set to "approved" or "rejected"
                equipmentFound = true;
                break;
            }
        }

        if (!equipmentFound) {
            return NextResponse.json(
                { success: false, error: "Equipment not found." },
                { status: 404 }
            );
        }

        // Write the updated data back to the file
        try {
            await fs.writeFile(filePath, JSON.stringify(equipmentData, null, 2), "utf-8");
        } catch (writeError) {
            console.error("Error writing to equipment file:", writeError);
            return NextResponse.json(
                { success: false, error: "Failed to save equipment data." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: `Equipment ${action} successfully.` });
    } catch (error) {
        console.error("Error updating equipment:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update equipment." },
            { status: 500 }
        );
    }
}