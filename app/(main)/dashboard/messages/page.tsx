import { Metadata } from "next"
import { MessagesContainer } from "@/components/messages/messages-container"

export const metadata: Metadata = {
  title: "Messages",
  description: "Connect and chat with other music enthusiasts",
}

export default function MessagesPage() {
  return (
    <div className="container max-w-[1500px] p-0">
      <MessagesContainer />
    </div>
  )
} 