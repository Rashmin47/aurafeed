import { LeftSidebar } from "@/components/layout/left-sidebar";
import { Navbar } from "@/components/layout/navbar";
import { getSessionUser } from "@/lib/auth";
import { tagPostCounts } from "@/lib/db/queries";

export default async function CoreGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  const tags = await tagPostCounts();
  return (
    <>
      <Navbar />
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-16 pt-4 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <LeftSidebar showCta={!user} tagsWithCounts={tags} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </>
  );
}
