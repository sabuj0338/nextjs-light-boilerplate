import { UserMenu } from '@/components/layout/UserMenu'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="w-64 border-r bg-muted/20 hidden md:block">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">My App</h2>
        </div>
      </div>
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b px-6 flex items-center justify-between bg-background">
          <div className="font-semibold md:hidden">My App</div>
          <div className="hidden md:block" />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
