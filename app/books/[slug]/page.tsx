import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Mic, MicOff } from "lucide-react";
import { getBookBySlug } from "@/lib/actions/book.actions";

interface Props {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: Props) => {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const { slug } = await params;
  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) redirect("/");

  const { title, author, coverURL, persona } = result.data;
  

  return (
    <main className="book-page-container">
      <Link href="/" className="back-btn-floating">
        <ArrowLeft className="w-5 h-5 text-[#212a3b]" />
      </Link>

      <div className="vapi-main-container gap-4 sm:gap-6">
        {/* Header card */}
        <div className="vapi-header-card w-full">
          <div className="vapi-cover-wrapper">
            <Image
              src={coverURL}
              alt={title}
              width={120}
              height={180}
              className="vapi-cover-image"
            />
            <div className="vapi-mic-wrapper">
              <button className="vapi-mic-btn" type="button" aria-label="Toggle microphone">
                <MicOff className="w-6 h-6 text-[#212a3b]" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-0">
            <div>
              <h1 className="book-title-lg">{title}</h1>
              <p className="text-base text-[#3d485e] font-medium">by {author}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="vapi-status-indicator">
                <span className="vapi-status-dot vapi-status-dot-ready" />
                <span className="vapi-status-text">Ready</span>
              </div>
              <div className="vapi-status-indicator">
                <span className="vapi-status-text">Voice: {persona ?? "Default"}</span>
              </div>
              <div className="vapi-status-indicator">
                <span className="vapi-status-text">0:00/15:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transcript area */}
        <div className="transcript-container w-full">
          <div className="transcript-empty">
            <Mic className="w-12 h-12 text-[#212a3b] mb-4" />
            <p className="transcript-empty-text">No conversation yet</p>
            <p className="transcript-empty-hint">Click the mic button above to start talking</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
