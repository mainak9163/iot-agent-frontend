/**
 * Item status enum
 */
export type ItemStatus = 'ok' | 'expiring_soon' | 'expired' | 'consumed' | 'spoilt';

/**
 * Item source enum
 */
export type ItemSource = 'manual' | 'barcode' | 'vision' | 'auto';

/**
 * Add item request payload
 */
export interface AddItemRequest {
  name: string;
  quantity: number;
  unit: string;
  mfd?: string;
  expd?: string;
  brand?: string;
  notes?: string;
  source?: ItemSource;
}

/**
 * Update item request payload
 */
export interface UpdateItemRequest {
  name?: string;
  quantity?: number;
  unit?: string;
  mfd?: string;
  expd?: string;
  brand?: string;
  notes?: string;
  source?: ItemSource;
  status?: ItemStatus;
}

// ============================================
// ITEM RESPONSE TYPES
// ============================================

/**
 * Base Item interface
 */
export interface Item {
  id: string;
  device_id: string;
  name: string;
  brand: string | null;
  barcode: string | null;
  mfd: string | null;
  expd: string | null;
  quantity: string;
  unit: string;
  status: ItemStatus;
  source: ItemSource;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Item counts by status
 */
export interface ItemCounts {
  ok?: number;
  expiring_soon?: number;
  expired?: number;
  consumed?: number;
  spoilt?: number;
}

/**
 * Add item response
 */
export interface AddItemResponse {
  item: Item;
}

/**
 * Get all items response
 */
export interface GetAllItemsResponse {
  items: Item[];
  counts: ItemCounts;
}

/**
 * Update item response
 */
export interface UpdateItemResponse {
  updated: boolean;
  item: Item;
}

/**
 * Delete item response
 */
export interface DeleteItemResponse {
  deleted: boolean;
  itemId: string;
}