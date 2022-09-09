import { Api } from "../services/api";

async function getParcelsData() {
  const parcelsData = await Api.post("/subpackages/getall").then(
    ({ data }) => data
  );

  return parcelsData;
}

export { getParcelsData };
