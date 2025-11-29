import { Item } from "../inventory-management.types";

/**
 * Barcode scan request payload
 */
export interface BarcodeScanRequest {
  barcode: string;
  timestamp?: string;
  locationOverride?: string;
}

/**
 * Parsed barcode data
 */
export interface BarcodeParsedData {
  gtin: string | null;
  mfd: string | null;
  expd: string | null;
}

/**
 * Barcode scan response
 */
export interface BarcodeScanResponse {
  item: Item;
  parsed: BarcodeParsedData;
  expired: boolean;
  buzzerTriggered: boolean;
}

