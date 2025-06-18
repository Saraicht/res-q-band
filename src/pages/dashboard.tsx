import { useState, useMemo, useEffect, useRef } from "react"
import { mockUsers } from "../data/mock-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, Download, RefreshCw } from "lucide-react"
import { StatsPanel } from "@/components/stats-panel"
import { UserCard } from "@/components/user-card"
import mqtt, { MqttClient } from "mqtt"
import { v4 as uuid } from "uuid"
import { config } from "@/config/env"

export interface Content { 
    temp: number;
    hum: number;
    pulse: number;
    spo2: number;
    mensaje: string;
}

interface Message {
  topic: string;
  content: Content;
}

const DashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "normal" | "warning" | "alert">("all")

  const [message, setMessage] = useState<Message | null>(null);
  const clientRef = useRef<MqttClient | null>(null);

  useEffect(() => {
    const url = config.mqtt.url;
    const options = {
      clientId: `clientId-${uuid()}`,
      username: config.mqtt.username,
      password: config.mqtt.password,
      keepalive: 60,
      clean: true,
    } as mqtt.IClientOptions;

    const mqttClient = mqtt.connect(url, options);

    mqttClient.on('connect', () => {
      console.log('Conectado al broker MQTT');
      mqttClient.subscribe('spyt/salud', (err) => {
        if (!err) {
          console.log('Suscrito a spyt/salud');
        }
      });
    });

    mqttClient.on('message', (topic: string, message: Buffer) => {
      const messageString = message.toString(); // Convierte el buffer a string
      console.log(`Mensaje recibido en ${ topic }:`, messageString);
      try {
        const messageObject = JSON.parse(messageString); // Convierte el string a objeto
        console.log(`Mensaje recibido en ${ topic }:`, messageObject);

        setMessage({ topic, content: messageObject }); // Usa el objeto en tu lógica
      } catch (error) {
        console.error("Error al parsear el mensaje MQTT:", error);
      }
    });
    mqttClient.on('error', (err: Error) => {
      console.log('Error:', err);
    });

    clientRef.current = mqttClient;

    return () => {
      if (clientRef.current) {
        clientRef.current.end();
      }
    };
  }, []);

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || user.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const recentAlerts = useMemo(() => {
    return mockUsers
      .filter((user) => user.status === "alert")
      .sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
      .slice(0, 5)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Médico SARAI</h1>
            <p className="text-gray-600 mt-1">Monitoreo en tiempo real de signos vitales</p>
          </div>
          <p>{
            message ?
              `Último mensaje recibido: ${ message.content.toString() } en el tópico ${ message.topic }` : "No se han recibido mensajes"
          }</p>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualizar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Stats Panel */}
        <StatsPanel users={mockUsers} />

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar por nombre de usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as  "all" | "normal" | "warning" | "alert")}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los estados</option>
              <option value="normal">Normal</option>
              <option value="warning">Precaución</option>
              <option value="alert">Alerta</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Users Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Usuarios Conectados ({filteredUsers.length})</h2>
            </div>

            {filteredUsers.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <UserCard  user={filteredUsers[1]} content={message?.content} />
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Search className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron usuarios</h3>
                  <p className="text-gray-500 text-center">
                    {searchTerm
                      ? "Intenta con otro término de búsqueda"
                      : "No hay usuarios que coincidan con los filtros seleccionados"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar with Recent Alerts */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Alertas Recientes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAlerts.length > 0 ? (
                  recentAlerts.map((user) => (
                    <div key={user.id} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-8 h-8 rounded-full bg-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-red-600">
                          FC: {user.heartRate} bpm, T: {message ? message.content?.temp : user.temperature}°C
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <p className="text-sm text-gray-500">No hay alertas activas</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Resumen Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Usuarios activos</span>
                  <span className="font-semibold text-green-600">
                    {mockUsers.filter((u) => u.status === "normal").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">En precaución</span>
                  <span className="font-semibold text-yellow-600">
                    {mockUsers.filter((u) => u.status === "warning").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">En alerta</span>
                  <span className="font-semibold text-red-600">
                    {mockUsers.filter((u) => u.status === "alert").length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;