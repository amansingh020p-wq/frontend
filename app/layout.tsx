import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer2 from "@/components/Footer2";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forex Flow – Forex Trading, Market Analysis & Signals",
  description:
    "Forex Flow provides expert forex trading insights, live market analysis, forex strategies, trading signals, risk management tips, and real-time chart analysis for profitable forex trading.",
  keywords: [
    "forex trading",
    "forex market",
    "forex signals",
    "forex analysis",
    "currency trading",
    "forex broker",
    "forex strategies",
    "forex indicators",
    "technical analysis",
    "fundamental analysis",
    "forex charts",
    "forex news",
    "forex volatility",
    "forex risk management",
    "forex training",
    "forex education",
    "trading psychology",
    "forex scalping",
    "forex day trading",
    "forex swing trading",
    "forex algorithmic trading",
    "forex liquidity",
    "forex profits",
    "USD/INR trading",
    "EUR/USD trading",
    "GBP/USD trading",
    "forex broker comparison",
    "forex trading platform",
    "live forex rates",
    "real-time forex updates",
    "forex mentorship",
    "forex signals provider",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        {/* ✅ Google Site Verification */}
        <meta
          name="google-site-verification"
          content="Gg2HPpHnTE4tUAoBfC3TLzUZ53vTL8JO1RjTRuVlhoU"
        />

        {/* ✅ Google Tag Manager (HEAD) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WWXJ9DM2');
            `,
          }}
        />

        {/* ✅ Google Analytics (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L61MGGKBBZ"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L61MGGKBBZ');
            `,
          }}
        />

        {/* Theme Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const path = window.location.pathname;
                const isDashboardOrAdmin =
                  path.startsWith('/dashboard') ||
                  path.startsWith('/admin');

                if (isDashboardOrAdmin) {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />

      </head>

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          poppins.className
        )}
      >
        {/* ✅ Google Tag Manager (BODY) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WWXJ9DM2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Navbar />
        <ThemeProvider>{children}</ThemeProvider>
        <Footer2 />
      </body>
    </html>
  );
}