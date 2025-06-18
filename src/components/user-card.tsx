import type { User } from "@/shared/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Thermometer, Clock } from "lucide-react"
import type { Content } from "@/pages/dashboard"

interface UserCardProps {
  user: User
  content?: Content
}

export function UserCard({ user, content }: UserCardProps) {
  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "alert":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: User["status"]) => {
    switch (status) {
      case "normal":
        return "Normal"
      case "warning":
        return "Precaución"
      case "alert":
        return "Alerta"
      default:
        return "Desconocido"
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getHeartRateColor = (heartRate: number) => {
    if (heartRate > 90 || heartRate < 60) return "text-red-600"
    if (heartRate > 85 || heartRate < 65) return "text-yellow-600"
    return "text-green-600"
  }

  const getTemperatureColor = (temperature: number) => {
    if (temperature > 37.5 || temperature < 35.5) return "text-red-600"
    if (temperature > 37 || temperature < 36) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-12 h-12 rounded-full bg-gray-200"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.age} años</p>
            </div>
          </div>
          <Badge className={getStatusColor(user.status)}>{getStatusText(user.status)}</Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Heart className={`w-4 h-4 ${ getHeartRateColor(user.heartRate) }`} />
              <span className="text-sm font-medium text-gray-700">Ritmo Cardíaco</span>
            </div>
            <span className={`text-lg font-bold ${ getHeartRateColor(user.heartRate) }`}>{content? content.pulse : user.heartRate} bpm</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Thermometer className={`w-4 h-4 ${ getTemperatureColor(user.temperature) }`} />
              <span className="text-sm font-medium text-gray-700">Temperatura</span>
            </div>
            <span className={`text-lg font-bold ${ getTemperatureColor(user.temperature) }`}>{content? content.temp :user.temperature}°C</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Última actualización</span>
            </div>
            <span>{formatTime(user.lastUpdate)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}