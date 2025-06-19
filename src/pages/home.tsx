import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/data/mock-data-test";
import {
  Heart,
  Thermometer,
  Bell,
  Users,
  FileText,
  Star,
  Smartphone,
  Shield,
  Clock,
  Download,
} from "lucide-react";

const HomePage = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Ritmo Cardíaco en Tiempo Real",
      description: "Monitoreo continuo de tu frecuencia cardíaca con alertas automáticas",
    },
    {
      icon: Thermometer,
      title: "Temperatura Corporal",
      description: "Control preciso de tu temperatura para detectar cambios importantes",
    },
    {
      icon: Bell,
      title: "Alertas Inteligentes",
      description: "Notificaciones inmediatas ante cualquier anomalía en tus signos vitales",
    },
    {
      icon: Users,
      title: "Múltiples Usuarios",
      description: "Conecta y monitorea a toda tu familia desde una sola aplicación",
    },
    {
      icon: FileText,
      title: "Historial y Reportes",
      description: "Accede a reportes detallados y compártelos con tu médico",
    },
    {
      icon: Shield,
      title: "Datos Seguros",
      description: "Información médica protegida con los más altos estándares de seguridad",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="border-0 bg-gradient-to-r from-blue-100 to-green-100 text-blue-800">
                  Tecnología Médica Avanzada
                </Badge>
                <h1 className="text-4xl leading-tight font-bold text-gray-900 md:text-6xl">
                  ResQBand
                  <span className="mt-2 block text-3xl font-normal text-gray-600 md:text-4xl">
                    Pulsera Médica Inteligente
                  </span>
                </h1>
                <p className="text-xl font-medium text-blue-600 md:text-2xl">
                  "Cuida tu salud en tiempo real, estés donde estés."
                </p>
                <p className="text-lg leading-relaxed text-gray-600">
                  Monitoreo continuo de signos vitales con tecnología de vanguardia. ResQBand te
                  mantiene conectado con tu salud las 24 horas del día.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-green-500 px-8 py-6 text-lg hover:from-blue-700 hover:to-green-600"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Descargar App
                </Button>
                <Button size="lg" variant="outline" className="border-2 px-8 py-6 text-lg">
                  Ver Demo
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Monitoreo 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Datos Seguros</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4" />
                  <span>App Gratuita</span>
                </div>
              </div>
            </div>

            {/* Product Mockup */}
            <div className="relative">
              <div className="relative z-10 rounded-3xl bg-gradient-to-br from-blue-600 to-green-500 p-8 shadow-2xl">
                <div className="space-y-4 rounded-2xl bg-white p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">ResQBand Dashboard</h3>
                    <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Ritmo Cardíaco</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">72 bpm</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Temperatura</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">36.5°C</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 scale-105 rotate-6 transform rounded-3xl bg-gradient-to-br from-blue-200 to-green-200 opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Beneficios que Marcan la Diferencia
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              ResQBand combina tecnología avanzada con simplicidad de uso para ofrecerte el mejor
              cuidado de tu salud
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <CardContent className="space-y-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-100 to-green-100">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="leading-relaxed text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Lo que Dicen Nuestros Usuarios
            </h2>
            <p className="text-xl text-gray-600">Testimonios reales de profesionales y pacientes</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map(testimonial => (
              <Card key={testimonial.id} className="border-0 shadow-lg">
                <CardContent className="space-y-4 p-6">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full bg-gray-200"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-500 py-20">
        <div className="mx-auto max-w-4xl space-y-8 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Comienza a Cuidar tu Salud Hoy Mismo
          </h2>
          <p className="text-xl text-blue-100">
            Descarga la app gratuita y conecta tu pulsera ResQBand en minutos
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-white px-8 py-6 text-lg text-blue-600 hover:bg-gray-100"
            >
              <Download className="mr-2 h-5 w-5" />
              Descargar para Android
            </Button>
            <Button
              size="lg"
              className="bg-white px-8 py-6 text-lg text-blue-600 hover:bg-gray-100"
            >
              <Download className="mr-2 h-5 w-5" />
              Descargar para iOS
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
