import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// GET method to fetch borrowed equipment
export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "public", "data", "equipment.json");
        const data = await fs.readFile(filePath, "utf-8");
        const equipmentData = JSON.parse(data);

        // Filter items with status "borrowed"
        const filteredData = [];
        for (const category in equipmentData) {
            if (equipmentData[category]) {
                filteredData.push(
                    ...equipmentData[category].filter((item) => item.status === "borrowed")
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

// POST method to update equipment status
export async function POST(req) {
    try {
        const { id, action } = await req.json();

        // Validate input
        if (!id || !action) {
            return NextResponse.json(
                { success: false, error: "Missing required fields: id or action." },
                { status: 400 }
            );
        }

        const filePath = path.join(process.cwd(), "public", "data", "equipment.json");
        const data = await fs.readFile(filePath, "utf-8");
        const equipmentData = JSON.parse(data);

        // Update the status of the specified equipment
        let equipmentFound = false;
        for (const category in equipmentData) {
            const equipment = equipmentData[category].find((item) => item.id === id);
            if (equipment) {
                if (action === "issued" && (equipment.lecapp !== "approved" || equipment.hodapp !== "approved")) {
                    return NextResponse.json(
                        { success: false, error: "Equipment cannot be issued without approvals." },
                        { status: 400 }
                    );
                }
                equipment.status = action; // Set to "issued" or "available"
                equipmentFound = true;
                console.log(`Equipment updated: ${equipment.name} (ID: ${equipment.id})`);
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