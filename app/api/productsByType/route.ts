import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/sanity.client";


export async function POST(req:NextRequest) {

    const { type} = await req.json(); 
    const query = `*[_type == "product" && type == $type]{
      _id,
      name,
      price,
      date,
      size,
      type,
      colors,
      soldOrNot,
      "imageUrl": productImage.asset->url
    }`;

    const data = await client.fetch(query, { type });

    return NextResponse.json(data);

  
}