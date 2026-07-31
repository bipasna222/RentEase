import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";

export async function GET() {
    try {
        await connectDB();

        const properties = await Property.find();

        return Response.json(properties);
    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
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
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
}