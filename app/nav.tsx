import Link from "next/link";
import { use } from "react";
import { UserContext } from "./user-context";

export function Nav() {
  const userContext = use(UserContext);
  return (
    <nav className="bg-slate-500 p-4 text-white flex justify-between">
      <ul className="flex">
        <li className="mr-4">
          <Link href="/">Todos</Link>
        </li>
        <li className="mr-4">
          <Link href="/blog">Blog</Link>
        </li>
        <li className="mr-4 flex-row-reverse">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      {userContext?.user && <div>Hello {userContext.user.name}</div>}
    </nav>
  );
}
