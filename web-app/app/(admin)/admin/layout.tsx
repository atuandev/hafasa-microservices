import { getUserInfo } from '@/actions/users/info'
import { AdminSidebar } from '@/app/(admin)/_components/admin-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const user = await getUserInfo()

  return (
    <SidebarProvider>
      <AdminSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger className="-ml-1" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Ctrl + B</p>
            </TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
