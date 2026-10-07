import connectDB from "@/lib/mongodb";

export async function GET() {
    try {
        await connectDB();

        return Response.json({
            message: "MongoDB Connected Successfully",
        });
    } catch (error) {
        return Response.json({
            message: "Connection Failed",
            error: error.message,
        });
    }
}