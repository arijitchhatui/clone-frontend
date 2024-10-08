import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import { Toaster } from "react-hot-toast";

import theme from "@/util/theme";
import "./globals.css";

const inter = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "400", "500", "600"],
});

export const metadata = {
  title: "Instagram",
  description: "cloning Instagram",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs14", "next14", "pwa", "next-pwa"],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-192x192.png" },
    { rel: "icon", url: "icons/instagram-symbol.png" },
  ],
} satisfies Metadata;

export const viewport: Viewport = {
  themeColor: "black",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="generator" content={metadata.generator} />
        <link rel="manifest" href={metadata.manifest} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        {metadata.icons.map(({ rel, url }, idx) => (
          <link key={idx} rel={rel} href={url} />
        ))}
      </head>

      <body className={inter.className}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName="toaster-wrapper"
          toastOptions={{
            className: "single-toaster",
            duration: 5000,
            icon: null,
            style: {
              background: "#000",
              color: "#fff",
              padding: "5px 5px",
              borderRadius: "3px",
              fontSize: "14px",
            },
            success: { style: { background: "#000", color: "#fff" } },
            error: { style: { background: "#b33234", color: "#fff" } },
          }}
        />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
