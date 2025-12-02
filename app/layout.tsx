import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppHeader } from "@/components/app-header"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "IoT Shelf",
  description: "Smart Kitchen Shelf Dashboard",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* 🌐 Global Header */}
          <AppHeader />

          {/* 🔳 Main App Content */}
          <main className="mx-auto">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
