interface StatCardProps {
  value: string
  label: string
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="text-center px-6 py-4">
      <div className="text-3xl md:text-4xl font-bold text-[#C9A84C] mb-1">{value}</div>
      <div className="text-[#666] text-sm uppercase tracking-wider">{label}</div>
    </div>
  )
}
