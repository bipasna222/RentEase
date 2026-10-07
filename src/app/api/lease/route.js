import connectDB from "@/lib/mongodb";
import Lease from "@/models/Lease";

export async function GET() {
    try {
        await connectDB();

        const leases = await Lease.find();

        return Response.json(leases);
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

        const lease = await Lease.create(body);

        return Response.json(lease);
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

        const updatedLease = await Lease.findByIdAndUpdate(
            _id,
            updateData,
            { new: true }
        );

        return Response.json(updatedLease);
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

        await Lease.findByIdAndDelete(id);

        return Response.json({
            message: "Lease deleted successfully",
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