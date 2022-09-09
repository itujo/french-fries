import useSWR, { SWRConfig, unstable_serialize } from "swr";
import Card from "../../../../components/Card/Card";
import { Api } from "../../../../services/api";
import { getParcelsData } from "../../../../utils/getParcelsData";

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "37" } }, { params: { id: "39" } }],
    fallback: "blocking", // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  // `getStaticProps` is executed on the server side.
  const parcelsData = await getParcelsData(params.id);
  return {
    props: {
      fallback: {
        [unstable_serialize(["subpackages", "getall", params.id])]: parcelsData,
      },
      params,
    },
  };
}

const fetcher = (url: string) => Api.get(url).then((res) => res.data);

function Parcels({ params }) {
  const { data, error } = useSWR<{
    [x: string]: {
      labelA: number;
      labelB: number | null;
    };
  }>(`/subpackages/getall/${params.id}`, fetcher, {
    refreshInterval: 1000,
  });

  if (!data) return <div>loading</div>;
  if (data) {
    const { PACKING, READY_TO_PICK, RECEIVING, SELLER_SHIPPED, SENT } = data;
    return (
      <div className="flex flex-col justify-center w-full p-2.5">
        <div className="flex">
          <Card description="Seller shipped A" data={SELLER_SHIPPED?.labelA} />
          <Card description="Receiving A" data={RECEIVING?.labelA} />
          <Card description="Ready To Pick A" data={READY_TO_PICK?.labelA} />
          <Card description="Packing A" data={PACKING?.labelA} />
          <Card description="Sent A" data={SENT?.labelA} />
        </div>

        <div className="flex">
          <Card description="Seller shipped B" data={SELLER_SHIPPED?.labelB} />
          <Card description="Receiving B" data={RECEIVING?.labelB} />
          <Card description="Sent B" data={SENT?.labelB} />
        </div>
      </div>
    );
  }

  if (error) return <div>error</div>;
  return <div></div>;
  // return (
  //   <div className="flex justify-center w-full">
  //     <div className="bg-white shadow-md rounded p-4 mb-4">hello</div>
  //   </div>
  // );
}

export default function Dashboard({ fallback, params }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Parcels params={params} />
    </SWRConfig>
  );
}
