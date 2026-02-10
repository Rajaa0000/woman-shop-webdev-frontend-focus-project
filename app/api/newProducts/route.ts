import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/sanity.client";

export async function GET() {
  const query = `*[_type == "product"] | order(date desc)[0...4]{
    name,
    price,
    date,
    size,
    type,
    colors,
    soldOrNot,
    "mainImage": productImage.asset->url,
    _id
  }`;

  const data = await client.fetch(query);
  return NextResponse.json(data);
}
