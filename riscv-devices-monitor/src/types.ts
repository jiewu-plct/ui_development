type Role = "Tester" | "Admin" | "Super Admin";

/**
 * data when received, it's raw
 */
interface DeviceData {
  hostname: string;
  ip: string;
  cpu_load: number;
  cpu_temp: number;
  memory_total: number; // unit G
  memory_used: number; // unit M
}

interface DevicesReceiver {
  data: DeviceData[];
  last_update: string;
}

interface GaugeData {
  min: number;
  max: number;
  value: number;
  name: string;
  config?: any;
}

export type { Role, DeviceData, DevicesReceiver, GaugeData };
