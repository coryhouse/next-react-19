import { use } from "react";
import { Comment } from "../types";

interface CommentsProps {
  commentsPromise: Promise<Response>;
}

export function Comments({ commentsPromise }: Readonly<CommentsProps>) {
  // Suspense fallback renders until this promise resolves
  const commentsResponse = use(commentsPromise);
  const comments = use(commentsResponse.json()) as Comment[];

  return (
    <>
      <h2 className="text-lg">Comments</h2>
      <section className="border mt-4 p-4">
        <ul>
          {comments.map(({ id, body }) => (
            <li key={id}>{body}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
