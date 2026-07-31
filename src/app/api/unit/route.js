import connectDB from "@/lib/mongodb";
import Unit from "@/models/Unit";

export async function GET() {
    try {
        await connectDB();

        const units = await Unit.find();

        return Response.json(units);
    } catch (error) {
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

        console.log(body);

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