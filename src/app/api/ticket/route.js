import connectDB from "@/lib/mongodb";
import Ticket from "@/models/Ticket";

export async function GET() {
    try {
        await connectDB();

        const tickets = await Ticket.find();

        return Response.json(tickets);
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

        const ticket = await Ticket.create(body);

        return Response.json(ticket);
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

        const updatedTicket = await Ticket.findByIdAndUpdate(
            _id,
            updateData,
            {
                new: true,
            }
        );

        return Response.json(updatedTicket);
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

        await Ticket.findByIdAndDelete(id);

        return Response.json({
            message: "Ticket deleted successfully",
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