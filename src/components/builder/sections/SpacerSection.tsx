interface Props { data: Record<string, string> }
export default function SpacerSection({ data }: Props) {
  return <div style={{ height: parseInt(data.height || '64', 10) }} aria-hidden />
}
