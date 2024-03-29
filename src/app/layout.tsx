import "./globals.scss";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "lounas",
    template: "%s | lounas",
  },
  applicationName: "lounas",
  description: "The Lunch Recommendation App for IPUT Students",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    title: "lounas",
    description: "The Lunch Recommendation App for IPUT Students",
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: "lounas",
  },
  icons: {
    icon: [
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: {
      url: "/favicon/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: [
      {
        rel: "mask-icon",
        url: "/favicon/safari-pinned-tab.svg",
        color: "#0077ff",
      },
    ],
  },
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#262626",
    },
  ],
  manifest: "/favicon/site.webmanifest",
  appleWebApp: {
    title: "lounas",
    statusBarStyle: "black",
    startupImage: "/favicon/android-chrome-512x512.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
