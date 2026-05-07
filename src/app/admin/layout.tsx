export default function AdminShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e0e0e0' }}>
      {children}
    </div>
  )
}
