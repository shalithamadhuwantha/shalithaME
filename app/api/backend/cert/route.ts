import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const certs = await prisma.cert.findMany({
      orderBy: { issuedate: 'desc' }, // sort newest first, change if needed
    });
    return NextResponse.json({ success: true, certs });
  } catch (error: any) {
    console.error("GET /api/backend/cert - Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load certificates" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  try {
    const certs = await req.json();
    if (!Array.isArray(certs)) {
      return NextResponse.json(
        { success: false, error: "Expected an array of certificates" },
        { status: 400 }
      );
    }

    // Fetch current certs from DB
    const dbCerts = await prisma.cert.findMany();
    const dbIds = dbCerts.map(c => c.id);
    const inputIds = certs.filter(c => c.id > 0).map(c => c.id);

    // To update or create
    for (const cert of certs) {
      // If id < 0 or not present, it's a new one
      if (!cert.id || cert.id < 0) {
        await prisma.cert.create({
          data: {
            certname: cert.certname,
            company: cert.company,
            issuedate: cert.issuedate ? new Date(cert.issuedate) : new Date(),
            veryfyid: cert.veryfyid,
            img: cert.img,
            tag: cert.tag,
            visibility: cert.visibility ?? true,
          }
        });
      } else {
        // Existing: update
        await prisma.cert.update({
          where: { id: cert.id },
          data: {
            certname: cert.certname,
            company: cert.company,
            issuedate: cert.issuedate ? new Date(cert.issuedate) : new Date(),
            veryfyid: cert.veryfyid,
            img: cert.img,
            tag: cert.tag,
            visibility: cert.visibility ?? true,
          }
        });
      }
    }

    // To delete: all db certs whose id is not present in submitted certs
    const toDelete = dbIds.filter(id => !inputIds.includes(id));
    if (toDelete.length > 0) {
      await prisma.cert.deleteMany({
        where: { id: { in: toDelete } }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("POST /api/backend/cert - Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update certificates" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
