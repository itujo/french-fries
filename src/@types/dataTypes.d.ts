interface RECEIVING {
  delivery_type: number[];
  is_cancel: string;
  start_warehouse_in_time: string;
  end_warehouse_in_time: string;
  warehouse_id: string[];
  page_index: number;
  per_page: string;
}

// ENVIADO
interface SENT {
  delivery_type: number[];
  is_cancel: string;
  start_delivered_time: string;
  end_delivered_time: string;
  warehouse_id: string[];
  page_index: number;
  per_page: string;
}

// SELLER SHIPPED
interface SELLER_SHIPPED {
  delivery_type: number[];
  start_merchant_delivery_time: string;
  end_merchant_delivery_time: string;
  is_cancel: string;
  warehouse_id: string[];
  page_index: number;
  per_page: string;
}

// somente A
interface TO_STORE {
  delivery_type: number[];
  is_cancel: string;
  start_sorted_time: string;
  end_sorted_time: string;
  warehouse_id: string[];
  page_index: number;
  per_page: string;
}

interface PACKING {
  delivery_type: number[];
  is_cancel: string;
  start_packaged_time: string;
  end_packaged_time: string;
  warehouse_id: string[];
  page_index: number;
  per_page: string;
}

interface BASIC {
  delivery_type: number[];
  is_cancel: string;
  warehouse_id: string[];
}

interface mTypes {
  PACKING: PACKING;
  TO_STORE: TO_STORE;
  RECEIVING: RECEIVING;
  SELLER_SHIPPED: SELLER_SHIPPED;
  SENT: SENT;
  BASIC: BASIC;
}

export type { mTypes };
