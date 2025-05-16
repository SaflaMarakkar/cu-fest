"use server";

import { sanityFetch } from "@/sanity/lib/live";

export async function fetchLocations() {
  return sanityFetch({
    query: `*[_type == "location"]`,
  });
}