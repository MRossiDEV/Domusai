import { Spinner } from "@/components/ui/spinner";

export default function DiscoverLoading() {
  return (
    <div
      className="theme-weeggo flex min-h-0 flex-1 items-center justify-center"
      style={{ background: "var(--weeggo-paper-dim)" }}
    >
      <Spinner className="size-6 text-primary" />
    </div>
  );
}
