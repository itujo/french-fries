// Generated by https://quicktype.io

export interface SubQueryResponse {
  type: string;
  label: string;
  startTime: string;
  endTime: string;
  movCount: number;
}

export interface ParcelTypes {
  PACKING: {
    labelA: number;
    labelB: number | null;
  };
  TO_STORE: { labelA: number; labelB: number | null };
  PICKING: { labelA: number; labelB: number | null };
  RECEIVING: { labelA: number; labelB: number | null };
  SELLER_SHIPPED: { labelA: number; labelB: number | null };
  SENT: { labelA: number; labelB: number | null };
}
