import Header from "@/components/Header"
import "tailwindcss/tailwind.css"
import { Poppins } from "@next/font/google"

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--poppins-next-font"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={`${poppins.variable} box-border`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className="bg-white"
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
