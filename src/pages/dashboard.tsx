import { useState, useMemo, useEffect, useRef } from "react";
import { mockUsers } from "../data/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Download, RefreshCw } from "lucide-react";
import { StatsPanel } from "@/components/stats-panel";
import { UserCard } from "@/components/user-card";
import mqtt, { MqttClient } from "mqtt";
import { v4 as uuid } from "uuid";
import { config } from "@/config/env";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "normal" | "warning" | "alert">("all");

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

    mqttClient.on("connect", () => {
      console.log("Conectado al broker MQTT");
      mqttClient.subscribe("spyt/salud", err => {
        if (!err) {
          console.log("Suscrito a spyt/salud");
        }
      });
    });

    mqttClient.on("message", (topic: string, message: Buffer) => {
      const messageString = message.toString(); // Convierte el buffer a string
      console.log(`Mensaje recibido en ${topic}:`, messageString);
      try {
        const messageObject = JSON.parse(messageString); // Convierte el string a objeto
        console.log(`Mensaje recibido en ${topic}:`, messageObject);

        setMessage({ topic, content: messageObject }); // Usa el objeto en tu lógica
      } catch (error) {
        console.error("Error al parsear el mensaje MQTT:", error);
      }
    });
    mqttClient.on("error", (err: Error) => {
      console.log("Error:", err);
    });

    clientRef.current = mqttClient;

    return () => {
      if (clientRef.current) {
        clientRef.current.end();
      }
    };
  }, []);

  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const recentAlerts = useMemo(() => {
    return mockUsers
      .filter(user => user.status === "alert")
      .sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
      .slice(0, 5);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Médico ResQBand</h1>
            <p className="mt-1 text-gray-600">Monitoreo en tiempo real de signos vitales</p>
          </div>
          <p>
            {message
              ? `Último mensaje recibido: ${message.content.toString()} en el tópico ${message.topic}`
              : "No se han recibido mensajes"}
          </p>
          <div className="mt-4 flex items-center space-x-3 md:mt-0">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualizar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Stats Panel */}
        <StatsPanel users={mockUsers} />

        {/* Filters and Search */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por nombre de usuario..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={statusFilter}
              onChange={e =>
                setStatusFilter(e.target.value as "all" | "normal" | "warning" | "alert")
              }
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">Todos los estados</option>
              <option value="normal">Normal</option>
              <option value="warning">Precaución</option>
              <option value="alert">Alerta</option>
            </select>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Users Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Usuarios Conectados ({filteredUsers.length})
              </h2>
            </div>

            {filteredUsers.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <UserCard user={filteredUsers[1]} content={message?.content} />
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Search className="mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    No se encontraron usuarios
                  </h3>
                  <p className="text-center text-gray-500">
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
                  recentAlerts.map(user => (
                    <div
                      key={user.id}
                      className="flex items-center space-x-3 rounded-lg bg-red-50 p-3"
                    >
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="h-8 w-8 rounded-full bg-gray-200"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-red-600">
                          FC: {user.heartRate} bpm, T:{" "}
                          {message ? message.content?.temp : user.temperature}°C
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <span className="text-xl text-green-600">✓</span>
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
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Usuarios activos</span>
                  <span className="font-semibold text-green-600">
                    {mockUsers.filter(u => u.status === "normal").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">En precaución</span>
                  <span className="font-semibold text-yellow-600">
                    {mockUsers.filter(u => u.status === "warning").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">En alerta</span>
                  <span className="font-semibold text-red-600">
                    {mockUsers.filter(u => u.status === "alert").length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
