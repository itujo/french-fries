import type { ParcelTypes } from "../../../@types/response";
import Card from "../../Card/Card";

export default function ParcelCards({ data }: { data: ParcelTypes }) {
  const { PACKING, READY_TO_PICK, RECEIVING, SELLER_SHIPPED, SENT } = data;

  return (
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
            <Card description="Ready To Pick A" data={READY_TO_PICK?.labelA} />
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
  );
}
