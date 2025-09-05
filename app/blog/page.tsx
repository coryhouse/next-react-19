import { Suspense } from "react";
import { Comments } from "./comments";
import { Spinner } from "@/components/Spinner";
import { postSchema } from "./postSchema";

const postId = 1;

export default async function Home() {
  // Awaited, so will wait for the promise to resolve
  // Tradeoff:
  // 🚩 slower time-to-first-byte, and sluggish response when the Blog link is clicked
  // ✅ faster time-to-interactive
  const postResponse = await fetch("http://localhost:3001/posts/" + postId);
  const post = postSchema.parse(await postResponse.json());

  // Not awaited, so won't wait for the promise to resolve
  const commentsPromise = fetch(
    "http://localhost:3001/comments?postId=" + postId
  );

  return (
    <>
      <h1>{post.title}</h1>
      <title>{post.title}</title>
      <p>{post.body}</p>
      <h2 className="mt-4">Comments</h2>
      <Suspense
        fallback={
          <div className="mt-4">
            Loading...
            <Spinner />
          </div>
        }
      >
        <Comments commentsPromise={commentsPromise} />
      </Suspense>
    </>
  );
}
