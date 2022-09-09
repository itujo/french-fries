import Link from "next/link";

export default function () {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Link href="/subpackages/query">query subpackages</Link>
    </>
  );
}
