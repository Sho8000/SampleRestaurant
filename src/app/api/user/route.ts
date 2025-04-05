import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(){
  try {
    const UserData = await prisma.user.findMany();
    return NextResponse.json(UserData);
  } catch (error) {
    console.error("Error getting User Info:", error);
    return NextResponse.json({ success: false, error: "Failed to get Instructor Info" },{status:500});
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.username || !body.useremail || !body.password) {
      return NextResponse.json({ message: "Missing information" });
    }
    const newInstructor = await prisma.user.create({
      data: {
        useremail: body.useremail as string,
        username: body.username as string,
        password: body.password as string,
      },
    });

    return NextResponse.json({
      message: "Added User successfully",
      post: newInstructor,
    });
  } catch (error) {
    console.error("Error adding new User Info:", error);
    return NextResponse.json({ success: false, error: "Failed to add User Info" });
  }
}
/* 
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();

  console.log(id)

  if( !id ){
    return NextResponse.json(
      { status: "error", message: "Instructor ID is required" },
      { status: 400 }
    );
  }

  try {
    const updateInstructor = await prisma.instructor.update({
      where:{
        id: id,
      },
      data:{
        name: body.name,
        languages: body.languages,
        phone: body.phone,
        email: body.email,
        password: body.password,
        ...(body.licenseNumber && { licenseNumber: body.licenseNumber as string }),
        ...(body.experienceYears && {experienceYears:body.experienceYears as number})
      }
    });

    return NextResponse.json({
      status: "success",
      data: updateInstructor,
    });
  } catch (error) {
    console.error("Error updating Instructor Info:", error);
    return NextResponse.json({ success: false, error: "Failed to update Instructor Info" });
  }
} */