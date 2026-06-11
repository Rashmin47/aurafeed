import { FeedSort } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Flame, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

function hrefFor(sort: FeedSort, tag?: string) {
  const params = new URLSearchParams();
  if (sort !== "hot") params.set("sort", sort);
  if (tag) params.set("tag", tag);
  const q = params.toString();
  return q ? `/?${q}` : "/";
}

export function FeedSortTabs({
  current,
  tag,
}: {
  current: FeedSort;
  tag?: string;
}) {
  const tabs: { id: FeedSort; label: string; icon: typeof Flame }[] = [
    { id: "hot", label: "Hot", icon: Flame },
    { id: "new", label: "New", icon: Sparkles },
    { id: "top", label: "Top", icon: TrendingUp },
  ];
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
      <div className="flex gap-1 rounded-full border border-border bg-card p-1 shadow-sm">
        {tabs.map(({ id, label, icon: Icon }) => {
          const active = current === id;

          return (
            <Link
              key={id}
              href={hrefFor(id, tag)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon />
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
