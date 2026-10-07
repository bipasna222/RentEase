import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";

export async function GET() {
    try {
        await connectDB();

        const properties = await Property.find();

        return Response.json(properties);
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

        const property = await Property.create(body);

        return Response.json(property);
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

        const updatedProperty = await Property.findByIdAndUpdate(
            _id,
            updateData,
            { new: true }
        );

        return Response.json(updatedProperty);
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

        await Property.findByIdAndDelete(id);

        return Response.json({
            message: "Property deleted successfully",
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