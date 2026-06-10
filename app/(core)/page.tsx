import { FeedSortTabs } from "@/components/feed/feed-sort-tabs";
import { getSessionUser } from "@/lib/auth";

export default async function Home() {
  const sessionUser = await getSessionUser();
  const rows = await listPostsSorted();
  return (
    <div>
      <div>
        <FeedSortTabs />
      </div>
    </div>
  );
}
