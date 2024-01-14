import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Energy Laundry",
  description: "Tempat kebutuhan laundry impianmu",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("bg-muted", poppins.className)}>
        <div className="relative bg-white max-w-screen-sm mx-auto h-full">
          {children}
        </div>
      </body>
    </html>
  )
}
