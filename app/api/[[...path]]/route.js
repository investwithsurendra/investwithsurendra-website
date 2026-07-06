import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";

let cachedClient = null;
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(process.env.MONGO_URL);
    await cachedClient.connect();
  }
  const dbName = process.env.DB_NAME || "invest_with_surendra";
  return cachedClient.db(dbName);
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

async function handler(request, { params }) {
  const pathArr = params?.path || [];
  const route = "/" + pathArr.join("/");
  const method = request.method;

  try {
    // Health check
    if (route === "/" || route === "/health") {
      return NextResponse.json(
        { status: "ok", app: "Invest With Surendra", timestamp: new Date().toISOString() },
        { headers: corsHeaders }
      );
    }

    // Lead / Enquiry submission
    if (route === "/leads" && method === "POST") {
      const body = await request.json();
      const { name, mobile, project, budget, visitDate, source } = body || {};
      if (!name || !mobile) {
        return NextResponse.json(
          { error: "Name and mobile are required." },
          { status: 400, headers: corsHeaders }
        );
      }
      const db = await getDb();
      const lead = {
        id: uuidv4(),
        name: String(name).trim(),
        mobile: String(mobile).trim(),
        project: project ? String(project).trim() : "",
        budget: budget ? String(budget).trim() : "",
        visitDate: visitDate ? String(visitDate).trim() : "",
        source: source || "website_hero_form",
        createdAt: new Date().toISOString(),
      };
      await db.collection("leads").insertOne(lead);
      return NextResponse.json(
        { success: true, message: "Thanks! Our team will contact you shortly.", lead },
        { headers: corsHeaders }
      );
    }

    if (route === "/leads" && method === "GET") {
      const db = await getDb();
      const leads = await db
        .collection("leads")
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray();
      return NextResponse.json({ leads }, { headers: corsHeaders });
    }

    return NextResponse.json(
      { error: "Route not found", route, method },
      { status: 404, headers: corsHeaders }
    );
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
