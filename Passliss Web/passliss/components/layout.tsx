import { SiteHeader } from "@/components/site-header"

export interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
