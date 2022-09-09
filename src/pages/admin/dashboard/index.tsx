import Link from "next/link";
import Card from "../../../components/Card/Card";

export default function Index() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
          <div className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-12 md:space-y-0">
            <div>
              <Link href={`dashboard/warehouse/37`}>
                <a>
                  <Card description="ANJ_PERUS" data={"Galpao perus"} />
                </a>
              </Link>
            </div>
            <div>
              <Link href={`dashboard/warehouse/39`}>
                <a>
                  <Card
                    description="ANJ_CARAPICUIBA"
                    data={"Galpao carapicuiba"}
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
