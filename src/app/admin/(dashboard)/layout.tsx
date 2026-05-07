import { requireAdminAuth } from '@/lib/admin-auth'
import AdminSidebar from './AdminSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAdminAuth()
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', maxHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}
