// ============================================
// CHECK EXPIRIES TYPES
// ============================================

/**
 * Expired item info
 */
export interface ExpiredItemInfo {
  id: string;
  name: string;
  expd: string;
}

/**
 * Outputs info
 */
export interface OutputsInfo {
  led_on: boolean;
  buzzer_on: boolean;
  spoilage_score: number;
}

/**
 * Check expiries response
 */
export interface CheckExpiriesResponse {
  expired: ExpiredItemInfo[];
  buzzerTriggered: boolean;
  outputs: OutputsInfo | null;
}

// ============================================
// DEVICE SNAPSHOT TYPES
// ============================================

/**
 * Device snapshot response
 */
export interface DeviceSnapshotResponse {
  device_id: string;
  name: string;
  location_label: string;
  location_lat: number;
  location_lng: number;
  last_seen_at: string;
  food_category: string;
  temp_threshold_c: string;
  humidity_threshold: string;
  gas_ppm_threshold: string;
  weight_min_g: string;
  dht_ts: string | null;
  temperature_c: string | null;
  humidity: string | null;
  mq2_ts: string | null;
  gas_ppm: string | null;
  raw_adc: string | null;
  hx_ts: string | null;
  weight_g: string | null;
  raw_value: string | null;
  calibrated: boolean | null;
  cam_ts: string | null;
  is_spoilt: boolean | null;
  cam_summary: string | null;
  image_url: string | null;
  out_ts: string | null;
  led_on: boolean | null;
  buzzer_on: boolean | null;
  spoilage_score: string | null;
}

// ============================================
// OUTPUT LATEST TYPES
// ============================================

/**
 * Latest output response
 */
export interface LatestOutputResponse {
  id: string;
  device_id: string;
  ts: string;
  led_on: boolean;
  buzzer_on: boolean;
  spoilage_score: string;
}

// ============================================
// DEVICE DASHBOARD TYPES
// ============================================

/**
 * Device basic info
 */
export interface DeviceInfo {
  id: string;
  name: string;
  location: {
    label: string;
    lat: number;
    lng: number;
  };
  last_seen_at: string;
}

/**
 * DHT11 sensor reading
 */
export interface DHT11Reading {
  id: string;
  device_id: string;
  ts: string;
  temperature_c: string;
  humidity: string;
}

/**
 * MQ2 sensor reading
 */
export interface MQ2Reading {
  id: string;
  device_id: string;
  ts: string;
  gas_ppm: string;
  raw_adc: string;
}

/**
 * HX711 sensor reading
 */
export interface HX711Reading {
  id: string;
  device_id: string;
  ts: string;
  weight_g: string;
  raw_value: string;
  calibrated: boolean;
}

/**
 * Webcam analysis
 */
export interface WebcamAnalysis {
  id: string;
  device_id: string;
  ts: string;
  is_spoilt: boolean;
  summary: string;
  image_url: string;
}

/**
 * Output data
 */
export interface OutputData {
  id: string;
  device_id: string;
  ts: string;
  led_on: boolean;
  buzzer_on: boolean;
  spoilage_score: string;
}

/**
 * Device configuration
 */
export interface DeviceConfig {
  id: string;
  device_id: string;
  food_category: string;
  temp_threshold_c: string;
  humidity_threshold: string;
  gas_ppm_threshold: string;
  weight_min_g: string;
  updated_at: string;
}

/**
 * Latest sensor readings
 */
export interface LatestReadings {
  dht11: DHT11Reading | null;
  mq2: MQ2Reading | null;
  hx711: HX711Reading | null;
  webcam: WebcamAnalysis | null;
  outputs: OutputData | null;
}

/**
 * Dashboard snapshot
 */
export interface DashboardSnapshot {
  device: DeviceInfo;
  latest: LatestReadings;
  config: DeviceConfig;
}

/**
 * Device dashboard response
 */
export interface DeviceDashboardResponse {
  snapshot: DashboardSnapshot;
  summary: string;
}