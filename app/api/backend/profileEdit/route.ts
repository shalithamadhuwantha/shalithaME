import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const profiles = await prisma.profile.findMany({
      where: {
        name: { in: ["bio", "spotlight", "skills"] },
      },
    });

    // console.log("GET /api/profile - Loaded profiles:", profiles);

    return NextResponse.json({ success: true, profiles });
  } catch (error: any) {
    // console.error("GET /api/profile - Error loading profiles:", error);

    return NextResponse.json(
      { success: false, error: error.message || "Failed to load profiles" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  try {
    const { name, content, visibility = true } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { success: false, error: 'Invalid "name" field' },
        { status: 400 }
      );
    }

    // Find existing profile by name (unique)
    const existing = await prisma.profile.findFirst({ where: { name } });

    let result;

    if (existing) {
      result = await prisma.profile.update({
        where: { id: existing.id },
        data: { content, visibility },
      });
      // console.log(`POST /api/profile - Updated profile: ${name}`);
    } else {
      result = await prisma.profile.create({
        data: { name, content, visibility },
      });
      // console.log(`POST /api/profile - Created profile: ${name}`);
    }

    return NextResponse.json({ success: true, profile: result });
  } catch (error: any) {
    // console.error("POST /api/profile - Error updating profile:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update profile",
        fullError: error,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
