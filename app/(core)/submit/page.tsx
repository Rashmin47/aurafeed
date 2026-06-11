import { SubmitPostForm } from "@/components/post/submit-post-form";
import { buttonVariants } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SubmitPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/auth/sign-in");
  }
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Create post</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Signed in as u/{user.username}. Posts use tags instead of
            communities.
          </p>
        </div>
        <Link
          href="/"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          Cancel
        </Link>
      </div>
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-6">
        <SubmitPostForm />
      </section>
    </div>
  );
}
