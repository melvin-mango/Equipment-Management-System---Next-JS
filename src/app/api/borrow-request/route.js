import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req) {
    try {
        const borrowRequest = await req.json();

        // Validate required fields in the borrow request
        if (!borrowRequest.borid || !borrowRequest.borname || !borrowRequest.selectedEquipments) {
            return NextResponse.json(
                { success: false, error: "Missing required fields in borrow request." },
                { status: 400 }
            );
        }

        const filePath = path.join(process.cwd(), "public", "data", "equipment.json");
        const data = await fs.readFile(filePath, "utf-8");
        const equipmentData = JSON.parse(data);

        // Update the equipment data based on the borrow request
        borrowRequest.selectedEquipments.forEach((item) => {
            let equipmentUpdated = false;

            for (const category in equipmentData) {
                if (!equipmentData[category]) continue; // Skip if category is missing

                const equipment = equipmentData[category].find((eq) => eq.id === item.id);
                if (equipment) {
                    equipment.status = "borrowed";
                    equipment.borid = borrowRequest.borid;
                    equipment.borname = borrowRequest.borname; // Ensure borname is updated
                    equipment.bordate = borrowRequest.borrowDate;
                    equipment.retdate = borrowRequest.returnDate;
                    equipment.purpose_of_use = borrowRequest.purpose;
                    equipment.used_out_campus = borrowRequest.offCampus ? "yes" : "no";
                    equipment.timestamp = borrowRequest.timestamp;

                    console.log(`Equipment updated: ${equipment.name} (ID: ${equipment.id})`); // Log successful update
                    equipmentUpdated = true;
                    break; // Exit the loop once the equipment is updated
                }
            }

            if (!equipmentUpdated) {
                console.warn(`Equipment with ID ${item.id} not found in any category.`);
            }
        });

        // Write the updated data back to the file
        await fs.writeFile(filePath, JSON.stringify(equipmentData, null, 2), "utf-8");

        return NextResponse.json({
            success: true,
            message: "Borrow request submitted successfully.",
            updatedData: equipmentData, // Return updated data
        });
    } catch (error) {
        console.error("Error processing borrow request:", error);
        return NextResponse.json({ success: false, error: "Failed to process borrow request." }, { status: 500 });
    }
}