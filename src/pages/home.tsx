import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { testimonials } from "@/data/mock-data-test"
import { Heart, Thermometer, Bell, Users, FileText, Star, Smartphone, Shield, Clock, Download } from "lucide-react"

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
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 border-0">
                  Tecnología Médica Avanzada
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  SARAI
                  <span className="block text-3xl md:text-4xl text-gray-600 font-normal mt-2">
                    Pulsera Médica Inteligente
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-600 font-medium">
                  "Cuida tu salud en tiempo real, estés donde estés."
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Monitoreo continuo de signos vitales con tecnología de vanguardia. SARAI te mantiene conectado con tu
                  salud las 24 horas del día.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-lg px-8 py-6"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Descargar App
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                  Ver Demo
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Monitoreo 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Datos Seguros</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4" />
                  <span>App Gratuita</span>
                </div>
              </div>
            </div>

            {/* Product Mockup */}
            <div className="relative">
              <div className="relative z-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">SARAI Dashboard</h3>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium">Ritmo Cardíaco</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">72 bpm</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium">Temperatura</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">36.5°C</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-green-200 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Beneficios que Marcan la Diferencia</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SARAI combina tecnología avanzada con simplicidad de uso para ofrecerte el mejor cuidado de tu salud
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Lo que Dicen Nuestros Usuarios</h2>
            <p className="text-xl text-gray-600">Testimonios reales de profesionales y pacientes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full bg-gray-200"
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Comienza a Cuidar tu Salud Hoy Mismo</h2>
          <p className="text-xl text-blue-100">Descarga la app gratuita y conecta tu pulsera SARAI en minutos</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              <Download className="w-5 h-5 mr-2" />
              Descargar para Android
            </Button>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              <Download className="w-5 h-5 mr-2" />
              Descargar para iOS
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage