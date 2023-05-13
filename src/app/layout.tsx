import "./globals.css";
import { Poppins, Caveat, Righteous } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "flowbite";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const caveat = Caveat({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-caveat",
});

const righteous = Righteous({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-righteous",
});

export const metadata = {
  title: "Sicky Pro",
  description:
    "Let Sicky Pro do the talking for you and enjoy a stress-free sick day.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="font-poppins">
        <body
          className={`${poppins.variable} ${caveat.variable} ${righteous.variable} font-sans`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
