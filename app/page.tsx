import { FeedSortTabs } from "@/components/feed/feed-sort-tabs";
import { PostCard } from "@/components/feed/post-card";
import { RightTrending } from "@/components/layout/right-trending";
import { getSessionUser } from "@/lib/auth";
import {
  batchAuthorsForIds,
  listPostsSorted,
  listTags,
} from "@/lib/db/queries";
import { getTrendingToday } from "@/lib/trending";
import { FeedSort } from "@/lib/types";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; tag?: string }>;
}) {
  const sp = await searchParams;
  const sortRaw = sp.sort;
  const sort: FeedSort =
    sortRaw === "new" || sortRaw === "top" ? sortRaw : "hot";

  const tagFilter = sp.tag?.toLowerCase();

  const sessionUser = await getSessionUser();
  const rows = await listPostsSorted(sort, tagFilter, sessionUser?.id);

  const tags = await listTags();
  const tagMap = new Map(tags.map((t) => [t.slug, t]));

  const authorIds = [...new Set(rows.map((r) => r.post.authorId))];
  const authorById = await batchAuthorsForIds(authorIds);
  if (sessionUser && authorById.has(sessionUser.id)) {
    authorById.set(sessionUser.id, sessionUser);
  }

  const trending = getTrendingToday();

  const cards = rows.map((row) => {
    const author = authorById.get(row.post.authorId);
    if (!author) return null;
    return (
      <PostCard
        key={row.post.id}
        post={row.post}
        author={author}
        tagsBySlug={tagMap}
        score={row.score}
        userVote={row.userVote}
      />
    );
  });
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Curated by tags
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Explore posts that match your current focus.
            </h1>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
              Browse the newest conversations, jump between hot discussions, and
              narrow the feed by tags without losing context.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
            <div className="rounded-xl border border-border bg-background/80 px-3 py-2">
              <div className="text-base font-semibold text-foreground">
                {rows.length}
              </div>
              Feed items
            </div>
            <div className="rounded-xl border border-border bg-background/80 px-3 py-2">
              <div className="text-base font-semibold text-foreground">
                {tags.length}
              </div>
              Tags
            </div>
            <div className="rounded-xl border border-border bg-background/80 px-3 py-2">
              <div className="text-base font-semibold text-foreground">
                {trending.length}
              </div>
              Trending
            </div>
          </div>
        </div>
      </section>

      <section className="xl:hidden">
        <RightTrending items={trending} />
      </section>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0 flex-1">
          <FeedSortTabs current={sort} tag={tagFilter} />
          <div className="space-y-4">
            {cards}
            {rows.length === 0 && (
              <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
                No posts match this filter.
              </p>
            )}
          </div>
        </div>
        <aside className="hidden xl:block">
          <div className="sticky top-20 space-y-6">
            <RightTrending items={trending} />
          </div>
        </aside>
      </div>
    </div>
  );
}
