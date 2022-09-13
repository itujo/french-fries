import { Navbar as FlowNavbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import anjunLogo from "../../../public/assets/logo.png";
import { Api } from "../../services/api";
export default function Navbar() {
  const [w, setW] = useState();
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const findWr = async () => {
        const warehouses = await Api.get("/opt/warehouses")
          .then(({ data }) => data)
          .catch((err) => err.response.data);

        const a = warehouses as any[];

        const w = a.find((wh) => wh.code === id);

        setW(w.description);
      };
      findWr();
    }
  }, [id]);

  return (
    <FlowNavbar fluid={true} rounded={true}>
      <FlowNavbar.Brand href="/">
        <div className="relative mr-3 w-16 h-6 sm:w-24 sm:h-9">
          <Image
            src={anjunLogo}
            layout="fill"
            alt="Anjun Logo"
            className="rounded-full"
          />
        </div>
      </FlowNavbar.Brand>
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        {w ? w : null}
      </span>
      <FlowNavbar.Toggle />
      <FlowNavbar.Collapse>
        <Link href="/">
          <FlowNavbar.Link active={router.pathname === "/"}>
            Home
          </FlowNavbar.Link>
        </Link>

        <Link href="/admin/dashboard">
          <FlowNavbar.Link
            active={router.pathname.includes("/admin/dashboard")}
          >
            Dashboard
          </FlowNavbar.Link>
        </Link>

        <Link href="/subpackages/query">
          <FlowNavbar.Link active={router.pathname === "/subpackages/query"}>
            Consulta
          </FlowNavbar.Link>
        </Link>
      </FlowNavbar.Collapse>
    </FlowNavbar>
  );
}
