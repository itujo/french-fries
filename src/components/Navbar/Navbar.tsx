import { Navbar as FlowNavbar } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

        console.log({ w });

        setW(w.description);
      };
      findWr();
    }
  }, []);

  return (
    <FlowNavbar fluid={true} rounded={true}>
      <FlowNavbar.Brand href="/">
        <img
          src="https://anjunbrasil.com.br/wp-content/uploads/2022/08/logo-anjun-oficial.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
      </FlowNavbar.Brand>
      <FlowNavbar.Toggle />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        {w ? w : null}
      </span>
      <FlowNavbar.Collapse>
        <FlowNavbar.Link href="/" active={true}>
          Home
        </FlowNavbar.Link>
        <FlowNavbar.Link href="/admin/dashboard">Dashboard</FlowNavbar.Link>
        <FlowNavbar.Link href="/subpackages/query">Consulta</FlowNavbar.Link>
      </FlowNavbar.Collapse>
    </FlowNavbar>
  );
}
