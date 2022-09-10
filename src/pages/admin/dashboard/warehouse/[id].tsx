import useSWR, { SWRConfig, unstable_serialize } from "swr";
import type { GetWarehouses } from "../../../../@types/getOptions";
import Card from "../../../../components/Card/Card";
import { Api } from "../../../../services/api";
import { getParcelsData } from "../../../../utils/getParcelsData";

export async function getStaticPaths() {
  const warehouses: GetWarehouses[] = await Api.get("/opt/warehouses")
    .then(({ data }) => data)
    .catch((err) => err.response.data);

  const paths = warehouses.map((warehouse) => ({
    params: { id: warehouse.code },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const parcelsData = await getParcelsData(params.id);
  return {
    revalidate: 10,
    props: {
      fallback: {
        [unstable_serialize(`/subpackages/getall/${params.id}`)]: parcelsData,
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
      <>
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
            <div className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-12 md:space-y-0">
              <div>
                <Card
                  description="Seller shipped A"
                  data={SELLER_SHIPPED?.labelA}
                />
              </div>
              <div>
                <Card description="Receiving A" data={RECEIVING?.labelA} />
              </div>
              <div>
                <Card
                  description="Ready To Pick A"
                  data={READY_TO_PICK?.labelA}
                />
              </div>
              <div>
                <Card description="Packing A" data={PACKING?.labelA} />
              </div>
              <div>
                <Card description="Sent A" data={SENT?.labelA} />
              </div>

              <div>
                <Card
                  description="Seller shipped B"
                  data={SELLER_SHIPPED?.labelB}
                />
              </div>

              <div>
                <Card description="Receiving B" data={RECEIVING?.labelB} />
              </div>
              <div>
                <Card description="Sent B" data={SENT?.labelB} />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) return <div>error</div>;
  return <div></div>;
}

export default function Dashboard({ fallback, params }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Parcels params={params} />
    </SWRConfig>
  );
}
