import type { User, HealthStats } from "@/shared/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Heart, Thermometer, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

interface StatsPanelProps {
  users: User[]
}

export function StatsPanel({ users }: StatsPanelProps) {
  const stats: HealthStats = {
    totalUsers: users.length,
    activeAlerts: users.filter((u) => u.status === "alert").length,
    avgHeartRate: Math.round(users.reduce((sum, u) => sum + u.heartRate, 0) / users.length),
    avgTemperature: Number((users.reduce((sum, u) => sum + u.temperature, 0) / users.length).toFixed(1)),
    maxHeartRate: Math.max(...users.map((u) => u.heartRate)),
    minHeartRate: Math.min(...users.map((u) => u.heartRate)),
  }

  const warningUsers = users.filter((u) => u.status === "warning").length
  const normalUsers = users.filter((u) => u.status === "normal").length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className="text-green-600">{normalUsers} normales</span>
            <span className="text-yellow-600">{warningUsers} precaución</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Alertas Activas</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.activeAlerts}</div>
          <p className="text-xs text-muted-foreground">Requieren atención inmediata</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">FC Promedio</CardTitle>
          <Heart className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.avgHeartRate}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <TrendingUp className="w-3 h-3 text-red-500" />
            <span>Máx: {stats.maxHeartRate}</span>
            <TrendingDown className="w-3 h-3 text-green-500" />
            <span>Mín: {stats.minHeartRate}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Temp. Promedio</CardTitle>
          <Thermometer className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.avgTemperature}°C</div>
          <p className="text-xs text-muted-foreground">Rango normal: 36.1-37.2°C</p>
        </CardContent>
      </Card>
    </div>
  )
}