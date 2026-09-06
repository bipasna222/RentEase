import connectDB from "@/lib/mongodb";
import Unit from "@/models/Unit";

export async function GET() {
    try {
        await connectDB();

        const units = await Unit.find();

        return Response.json(units);
    } catch (error) {
        console.log(error);

        return Response.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        const unit = await Unit.create(body);

        return Response.json(unit);
    } catch (error) {
        console.log(error);

        return Response.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}

export async function PUT(request) {
    try {
        await connectDB();

        const body = await request.json();

        const { _id, ...updateData } = body;

        const updatedUnit = await Unit.findByIdAndUpdate(
            _id,
            updateData,
            {
                new: true,
            }
        );

        return Response.json(updatedUnit);
    } catch (error) {
        console.log(error);

        return Response.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}

export async function DELETE(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);

        const id = searchParams.get("id");

        await Unit.findByIdAndDelete(id);

        return Response.json({
            message: "Unit deleted successfully",
        });
    } catch (error) {
        console.log(error);

        return Response.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}