import { use } from "react";
import { z } from "zod";

const commentSchema = z.object({
  id: z.number(),
  body: z.string(),
  postId: z.number(),
});

interface CommentsProps {
  commentsPromise: Promise<Response>;
}

export function Comments({ commentsPromise }: Readonly<CommentsProps>) {
  // Suspense fallback renders until promises wrapped in "use" resolve
  const resp = use(commentsPromise);
  const comments = commentSchema.array().parse(use(resp.json()));

  return (
    <>
      <section className="mt-4">
        <ul>
          {comments.map(({ id, body }) => (
            <li key={id}>{body}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
