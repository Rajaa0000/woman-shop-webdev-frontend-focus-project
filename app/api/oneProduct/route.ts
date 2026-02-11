import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/sanity.client";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const query = `*[_type == "product" && _id == $id]{
      _id,
      name,
      price,
      date,
      size,
      type,
      colors,
      slodOrNot,
      productDesc,
      productImage,
      productImages
    }`;

    const data = await client.fetch(query, { id });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}