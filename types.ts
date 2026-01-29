
export enum DeviceStatus {
  ONLINE = '在线',
  OFFLINE = '离线',
  WORKING = '工作中',
  IDLE = '待命'
}

export interface Insight {
  id: string;
  time: string;
  type: 'pickup' | 'place' | 'warn';
  content: string;
  imageUrl?: string;
}

export interface RobotTask {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed';
  timestamp: string;
}
