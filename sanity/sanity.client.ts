
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";


export  const client = createClient({
   projectId: 'tvunmqdg',   // 👈 from sanity.json or manage.sanity.io
  dataset: "production",          // 👈 default dataset
  apiVersion: "2023-01-01",       // 👈 use a date (today’s date is fine)
  useCdn: true,                   // `true` = faster, cached, read-only
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}