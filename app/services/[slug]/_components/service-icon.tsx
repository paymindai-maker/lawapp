import {
  FileText, Shield, Building2, Scale, Landmark, Briefcase,
  Globe, Users, BookOpen, ReceiptText, ShieldCheck, FileCheck,
  Rocket, Banknote, TrendingUp, Award, Gavel, FilePlus, CheckCircle2,
  type LucideIcon,
} from "lucide-react"

const ICON_MAP: Record<string, LucideIcon> = {
  Building2, FileText, Shield, Rocket, Scale, Landmark, Briefcase,
  Globe, Users, BookOpen, ReceiptText, ShieldCheck, FileCheck,
  Banknote, TrendingUp, Award, Gavel, FilePlus, CheckCircle2,
}

export function ServiceIcon({
  name,
  className,
  style,
}: {
  name: string
  className?: string
  style?: React.CSSProperties
}) {
  const Icon = ICON_MAP[name] ?? Briefcase
  return <Icon className={className} style={style} />
}
