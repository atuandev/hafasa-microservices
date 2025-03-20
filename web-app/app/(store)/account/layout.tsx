import { UserSidebar } from '@/app/(store)/account/_components/user-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Container } from '@/components/common/container'

export default function AccountLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <SidebarProvider className="gap-4 rounded-lg">
      <Container className="flex flex-col md:flex-row p-4 md:p-0">
        {/* Mobile */}
        <UserSidebar isMobile />

        {/* Desktop */}
        <UserSidebar />
        <main className="w-full md:p-4">
          {children}
        </main>
      </Container>
    </SidebarProvider>
  )
}
