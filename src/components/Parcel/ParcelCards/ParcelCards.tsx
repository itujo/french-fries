import type { ParcelTypes } from "../../../@types/response";
import Card from "../../Card/Card";

export default function ParcelCards({ data }: { data: ParcelTypes }) {
  const { PACKING, TO_STORE, RECEIVING, SELLER_SHIPPED, SENT, PICKING } = data;

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
        <div className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-12 md:space-y-0">
          <div>
            <Card
              description="Enviado pelo seller A"
              data={SELLER_SHIPPED?.labelA}
            />
          </div>
          <div>
            <Card description="Varredura A" data={RECEIVING?.labelA} />
          </div>
          <div>
            <Card description="Armazenagem A" data={TO_STORE?.labelA} />
          </div>
          <div>
            <Card description="Retirada A" data={PICKING?.labelA} />
          </div>
          <div>
            <Card description="Consolidação A" data={PACKING?.labelA} />
          </div>
          <div>
            <Card description="Enviado A" data={SENT?.labelA} />
          </div>

          <div>
            <Card
              description="Enviado pelo seller B"
              data={SELLER_SHIPPED?.labelB}
            />
          </div>

          <div>
            <Card description="Varredura B" data={RECEIVING?.labelB} />
          </div>
          <div>
            <Card description="Enviado B" data={SENT?.labelB} />
          </div>
        </div>
      </div>
    </section>
  );
}
