import {
  Sprout,
  Shapes,
  Clock3,
  Zap,
  Layers3,
  GitBranch,
  Sparkles,
  PenLine,
  CircleCheck,
  type LucideIcon,
} from "lucide-react";
const icons: LucideIcon[] = [
  Sprout,
  Shapes,
  Clock3,
  Zap,
  Layers3,
  GitBranch,
  Sparkles,
  PenLine,
  CircleCheck,
];
export function ChapterIcon({
  order,
  size = 20,
}: {
  order: number;
  size?: number;
}) {
  const Icon = icons[(order - 1) % icons.length] ?? Sprout;
  return <Icon size={size} strokeWidth={1.7} />;
}
