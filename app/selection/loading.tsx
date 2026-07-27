import { Spinner } from "@/components/ui/spinner";

export default function SelectionLoading() {
  return (
    <div className="theme-weeggo flex h-dvh items-center justify-center bg-background">
      <Spinner className="size-6 text-primary" />
    </div>
  );
}
