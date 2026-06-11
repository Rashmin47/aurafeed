"use client";

import { cn } from "@/lib/utils";
import { Flame, Home, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { LeftTags } from "./left-tags";
import { JoinCtaCard } from "./joint-cta-card";
import { Tag } from "@/lib/types";

const nav = [
  { href: "/", label: "Home", icon: Home, match: "home" as const },
  { href: "/?sort=hot", label: "Popular", icon: Flame, match: "hot" as const },
  {
    href: "/?sort=new",
    label: "All Posts",
    icon: LayoutGrid,
    match: "new" as const,
  },
];

export function LeftSidebar({
  showCta,
  tagsWithCounts,
}: {
  showCta: boolean;
  tagsWithCounts: { tag: Tag; count: number }[];
}) {
  const pathname = usePathname();
  const sp = useSearchParams();
  const sort = sp.get("sort");

  return (
    <aside className="space-y-6 lg:sticky lg:top-20 lg:w-52 lg:shrink-0">
      <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-border bg-card p-2 lg:block lg:space-y-1 lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:pr-2">
        {nav.map(({ href, label, icon: Icon, match }) => {
          const active =
            match === "home"
              ? pathname === "/" &&
                sort !== "hot" &&
                sort !== "new" &&
                sort !== "top"
              : match === "hot"
                ? pathname === "/" && sort === "hot"
                : match === "new"
                  ? pathname === "/" && sort === "new"
                  : false;

          return (
            <Link
              key={match}
              href={href}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:border-l-2 lg:px-3",
                active && "border-primary bg-muted/60 text-foreground",
              )}
            >
              <Icon
                className={cn(
                  "size-5 shrink-0",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="rounded-2xl border border-border bg-card p-4 lg:mt-8 lg:border-0 lg:bg-transparent lg:p-0">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Top Tags
        </p>
        <LeftTags items={tagsWithCounts} />
      </div>
      {showCta && (
        <div className="rounded-2xl border border-border bg-card p-4 lg:mt-8 lg:border-0 lg:bg-transparent lg:p-0">
          <JoinCtaCard />
        </div>
      )}
    </aside>
  );
}
