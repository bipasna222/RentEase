import connectDB from "@/lib/mongodb";
import Payment from "@/models/Payment";

export async function GET() {
    try {
        await connectDB();

        const payments = await Payment.find();

        return Response.json(payments);
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

        const payment = await Payment.create(body);

        return Response.json(payment);
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

        const updatedPayment =
            await Payment.findByIdAndUpdate(
                _id,
                updateData,
                {
                    new: true,
                }
            );

        return Response.json(updatedPayment);
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

        const { searchParams } =
            new URL(request.url);

        const id = searchParams.get("id");

        await Payment.findByIdAndDelete(id);

        return Response.json({
            message: "Payment deleted successfully",
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