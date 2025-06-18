import type { User, Testimonial } from "@/shared/types"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "María González",
    heartRate: 72,
    temperature: 36.5,
    status: "normal",
    lastUpdate: "2024-01-15T10:30:00Z",
    avatar: "/assets/placeholder.svg?height=40&width=40",
    age: 45,
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    heartRate: 95,
    temperature: 37.2,
    status: "alert",
    lastUpdate: "2024-01-15T10:25:00Z",
    avatar: "/assets/placeholder.svg?height=40&width=40",
    age: 62,
  },
  {
    id: "3",
    name: "Ana López",
    heartRate: 68,
    temperature: 36.3,
    status: "normal",
    lastUpdate: "2024-01-15T10:28:00Z",
    avatar: "/assets/placeholder.svg?height=40&width=40",
    age: 38,
  },
  {
    id: "4",
    name: "José Martínez",
    heartRate: 88,
    temperature: 36.8,
    status: "warning",
    lastUpdate: "2024-01-15T10:20:00Z",
    avatar: "/assets/placeholder.svg?height=40&width=40",
    age: 55,
  },
  {
    id: "5",
    name: "Laura Sánchez",
    heartRate: 65,
    temperature: 36.1,
    status: "normal",
    lastUpdate: "2024-01-15T10:32:00Z",
    avatar: "/assets/placeholder.svg?height=40&width=40",
    age: 29,
  },
  {
    id: "6",
    name: "Roberto Silva",
    heartRate: 78,
    temperature: 36.7,
    status: "normal",
    lastUpdate: "2024-01-15T10:15:00Z",
    avatar: "/assets/placeholder.svg?height=40&width=40",
    age: 41,
  },
]

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Elena Vásquez",
    role: "Cardióloga",
    content:
      "SARAI ha revolucionado el monitoreo de mis pacientes. Los datos en tiempo real me permiten tomar decisiones más informadas.",
    avatar: "/assets/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    id: "2",
    name: "Miguel Torres",
    role: "Paciente",
    content:
      "Desde que uso SARAI, me siento más tranquilo. Las alertas me han ayudado a prevenir situaciones de riesgo.",
    avatar: "/assets/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    id: "3",
    name: "Carmen Ruiz",
    role: "Enfermera",
    content:
      "La facilidad de uso y la precisión de los datos hacen de SARAI una herramienta indispensable en nuestro hospital.",
    avatar: "/assets/placeholder.svg?height=60&width=60",
    rating: 5,
  },
]