import { Metadata } from "next";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import ContainerWrap from "@/components/container";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("photo");

  return (
    <main>
      <ContainerWrap>
        <PrismicRichText field={page.data.title} />
      </ContainerWrap>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("photo");

  return {
    title: prismic.asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}
