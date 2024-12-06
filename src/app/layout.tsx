import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import global from "../global/index.module.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={global.html + " " + inter.className}>
      <body className={global.body}>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
