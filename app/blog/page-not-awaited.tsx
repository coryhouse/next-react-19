import { Suspense, use } from "react";
import { Comments } from "./comments";
import { Spinner } from "@/components/Spinner";
import { postSchema } from "./postSchema";

const postId = 1;

export default async function Home() {
  // NOT awaited, so shows loading spinner until promises resolve
  // Tradeoff:
  // 🚩 faster time-to-first-byte, and fast response when the Blog link is clicked
  // ✅ slower time-to-interactive

  // Not awaited, so won't wait for the promise to resolve
  const postPromise = fetch("http://localhost:3001/posts/" + postId);
  const commentsPromise = fetch(
    "http://localhost:3001/comments?postId=" + postId
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPage postPromise={postPromise} commentsPromise={commentsPromise} />
    </Suspense>
  );
}

type BlogPageProps = {
  postPromise: Promise<Response>;
  commentsPromise: Promise<Response>;
};

function BlogPage({ postPromise, commentsPromise }: BlogPageProps) {
  const postResp = use(postPromise);
  const post = postSchema.parse(use(postResp.json()));
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
