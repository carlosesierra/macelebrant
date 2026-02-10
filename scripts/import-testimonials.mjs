import fs from "node:fs/promises";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

// ✅ Load Next env file explicitly for Node scripts
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

console.log({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  hasToken: !!process.env.SANITY_API_TOKEN,
});

function safeIdFromSlug(slug) {
  return `testimonial.${slug}`;
}

async function uploadImageFromUrl(url, filenameBase) {
  if (!url) return null;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image fetch failed ${res.status} for ${url}`);

  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // filename helps in the Sanity media library
  const asset = await client.assets.upload("image", buffer, {
    filename: `${filenameBase}.jpg`,
  });

  return asset._id;
}

async function main() {
  const raw = await fs.readFile("./testimonials_for_sanity.json", "utf8");
  const items = JSON.parse(raw);

  let ok = 0;
  let fail = 0;

  for (const item of items) {
    const slug = item.slug;
    const _id = safeIdFromSlug(slug);

    try {
      const assetId = await uploadImageFromUrl(item.imageUrl, slug);

      const doc = {
        _id,
        _type: "testimonial",
        heading: item.heading,
        slug: { _type: "slug", current: slug },
        date: item.date || null,
        content: item.content || "",
        ...(assetId
          ? { image: { _type: "image", asset: { _type: "reference", _ref: assetId } } }
          : {}),
        // NOTE: orderRank can be left out; you can reorder later in Studio.
      };

      await client.createOrReplace(doc);
      ok++;
      console.log(`✅ ${ok}/${items.length} Imported: ${item.heading}`);
    } catch (e) {
      fail++;
      console.error(`❌ Failed: ${item.heading}\n   ${e.message}`);
    }
  }

  console.log(`\nDone. Success: ${ok}, Failed: ${fail}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

console.log({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  hasToken: !!process.env.SANITY_API_TOKEN,
})