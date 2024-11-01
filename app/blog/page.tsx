import { Suspense } from "react";
import { Post } from "../types";
import { Comments } from "./comments";

const postId = 1;

export default async function Home() {
  // Awaited, so will wait for the promise to resolve
  const postResponse = await fetch("http://localhost:3001/posts/" + postId);
  const post = (await postResponse.json()) as Post;

  // Not awaited, so won't wait for the promise to resolve
  const commentsPromise = fetch(
    "http://localhost:3001/comments?postId=" + postId
  );

  return (
    <>
      <h1 className="text-xl">{post.title}</h1>
      <title>{post.title}</title>
      <p>{post.body}</p>
      <Suspense fallback={<div>Loading comments...</div>}>
        <Comments commentsPromise={commentsPromise} />
      </Suspense>
    </>
  );
}
