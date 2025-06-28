import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudyBuddy",
  description: "Real-time AI tutoring for every learner",
  icons: {
    icon: "/images/studdybuddy.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!} appearance={{ variables: { colorPrimary: '#fe5933' } }}>
      <html lang="en">
        <body className={`${bricolage.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
