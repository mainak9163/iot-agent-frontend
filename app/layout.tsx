import "./globals.css"

export const metadata = {
  title: "IoT Shelf",
  description: "Smart Kitchen Shelf Dashboard",
}

interface LayoutProps{
  children: React.ReactNode
}
export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}
