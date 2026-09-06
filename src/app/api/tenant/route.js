import connectDB from "@/lib/mongodb";
import Tenant from "@/models/Tenant";

export async function GET() {
  try {
    await connectDB();

    const tenants = await Tenant.find();

    return Response.json(tenants);
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

    const tenant = await Tenant.create(body);

    return Response.json(tenant);
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

    const updatedTenant = await Tenant.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );

    return Response.json(updatedTenant);
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

    await Tenant.findByIdAndDelete(id);

    return Response.json({
      message: "Tenant deleted successfully",
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