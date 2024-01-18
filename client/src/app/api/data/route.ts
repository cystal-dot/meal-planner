import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
// app/api/data/route.ts

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch("http://localhost:3001/api/getRecipes");
  const data = await response.json();
  return NextResponse.json(data);
}
