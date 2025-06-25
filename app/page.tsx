export const metadata = {
  metadataBase: new URL("https://www.trenteco.co.uk"),
  title: "TrentEco - Sustainable Paper Bags",
  description: "Custom eco-friendly paper bags made in the UK. Fast turnaround, sustainable materials, and tailored branding options.",
  openGraph: {
    title: "TrentEco - Sustainable Paper Bags",
    description: "Custom eco-friendly paper bags made in the UK. Fast turnaround, sustainable materials, and tailored branding options.",
    url: "https://www.trenteco.co.uk",
    siteName: "TrentEco",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
        alt: "TrentEco Logo",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrentEco - Sustainable Paper Bags",
    description: "Custom eco-friendly paper bags made in the UK. Fast turnaround, sustainable materials, and tailored branding options.",
    images: ["/logo.svg"],
  },
};

import HomeClient from "@/components/HomeClient";

export default function Home() {
  return <HomeClient />;
}
