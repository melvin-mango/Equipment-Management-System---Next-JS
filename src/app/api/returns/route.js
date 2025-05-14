import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// GET method to fetch all equipment data
export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "public", "data", "equipment.json");
        const data = await fs.readFile(filePath, "utf-8");
        const equipmentData = JSON.parse(data);

        return NextResponse.json(equipmentData, { status: 200 });
    } catch (error) {
        console.error("Error fetching equipment data:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch equipment data." },
            { status: 500 }
        );
    }
}

// POST method to handle equipment returns
export async function POST(req) {
    try {
        const { studentName, timestamp } = await req.json();

        // Validate input
        if (!studentName || !timestamp) {
            return NextResponse.json(
                { success: false, error: "Missing required fields: studentName or timestamp." },
                { status: 400 }
            );
        }

        const filePath = path.join(process.cwd(), "public", "data", "equipment.json");
        const data = await fs.readFile(filePath, "utf-8");
        const equipmentData = JSON.parse(data);

        // Update the equipment data for the specified student and timestamp
        let equipmentUpdated = false;
        for (const category in equipmentData) {
            equipmentData[category] = equipmentData[category].map((item) => {
                if (item.borname === studentName && item.timestamp === timestamp && item.status === "issued") {
                    equipmentUpdated = true;
                    return {
                        ...item,
                        lecapp: "",
                        hodapp: "",
                        borid: "",
                        borname: "",
                        bordate: "",
                        retdate: "",
                        purpose_of_use: "",
                        used_out_campus: "",
                        timestamp: "",
                        status: "available",
                    };
                }
                return item;
            });
        }

        if (!equipmentUpdated) {
            return NextResponse.json(
                { success: false, error: "No matching equipment found for the provided studentName and timestamp." },
                { status: 404 }
            );
        }

        // Write the updated data back to the file
        await fs.writeFile(filePath, JSON.stringify(equipmentData, null, 2), "utf-8");

        return NextResponse.json({ success: true, message: "Equipment returned successfully." });
    } catch (error) {
        console.error("Error processing return:", error);
        return NextResponse.json(
            { success: false, error: "Failed to process the return." },
            { status: 500 }
        );
    }
}