import Link from "next/link";
import cl from "clsx";
import { useRouter } from "next/router";

export const Nav = () => {
  const router = useRouter();
  const classN = (s: string, frontPage?: boolean) =>
    cl("px-3 rounded-full py-1 min-h-8", {
      "bg-slate-200 text-slate-900": frontPage
        ? router.asPath === "/"
        : router.asPath.startsWith(`/${s}`),
      "bg-slate-700 text-slate-200": frontPage
        ? router.asPath !== "/"
        : !router.asPath.startsWith(`/${s}`),
    });

  return (
    <div className="flex gap-2 mb-8">
      <Link href="/" passHref>
        <a className={classN("", true)}>Dashboard</a>
      </Link>
      <Link href="/komponenter" passHref>
        <a className={classN("komponenter")}>Komponenter</a>
      </Link>
      <Link href="/elementer" passHref>
        <a className={classN("elementer")}>Elementer</a>
      </Link>
      {/* <Link href="#" passHref>
        <a className={classN("Ikoner")}>Ikoner</a>
      </Link> */}
    </div>
  );
};
