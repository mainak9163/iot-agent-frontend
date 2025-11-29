// ============================================
// VISION DETECTION TYPES
// ============================================

import { Item } from "../inventory-management.types";

/**
 * Single detected item in vision request
 */
export interface VisionDetectedItem {
  name: string;
  quantity: number;
  unit: string;
  expd?: string;
}

/**
 * Vision detection request payload
 */
export interface VisionDetectionRequest {
  image_url: string;
  items: VisionDetectedItem[];
}

/**
 * Vision detection response
 */
export interface VisionDetectionResponse {
  image_url: string;
  created: Item[];
  aiSummary: string;
}

