export interface User {
  id: string
  name: string
  heartRate: number
  temperature: number
  status: "normal" | "alert" | "warning"
  lastUpdate: string
  avatar: string
  age: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar: string
  rating: number
}

export interface HealthStats {
  avgHeartRate: number
  avgTemperature: number
  totalUsers: number
  activeAlerts: number
  maxHeartRate: number
  minHeartRate: number
}