import { StreamSetup } from "@/components/stream/stream-setup"

export const metadata = {
  title: "Stream Setup",
  description: "Configure your stream settings and get your stream key",
}

export default function StreamSetupPage() {
  return (
    <div className="container max-w-[1000px] py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Stream Setup</h1>
        <p className="text-muted-foreground">
          Configure your stream settings and get your stream key
        </p>
      </div>
      <StreamSetup />
    </div>
  )
} 