import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduAI — AI-Powered Educational Assessment",
  description:
    "Empower teachers and students with AI-driven assessments, instant feedback, and personalized learning paths.",
  keywords: ["education", "AI", "assessment", "learning", "students", "teachers"],
  authors: [{ name: "EduAI Team" }],
  openGraph: {
    title: "EduAI — AI-Powered Educational Assessment",
    description:
      "Empower teachers and students with AI-driven assessments, instant feedback, and personalized learning paths.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1e293b",
                color: "#f8fafc",
                border: "1px solid #334155",
              },
              success: {
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#f8fafc",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#f8fafc",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
