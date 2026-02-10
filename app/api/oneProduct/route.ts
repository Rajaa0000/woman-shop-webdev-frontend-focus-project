import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/sanity.client";


export async function POST(req) {

    const { id } = await req.json(); // get the id from request body

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
      "mainImage": productImage.asset->url,
      "images": productImages[].asset->url
    }`;

    const data = await client.fetch(query, { id });
   
    return NextResponse.json(data);

  
}
