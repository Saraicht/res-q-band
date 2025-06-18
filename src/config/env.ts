export const config = {
  mqtt: {
    url: import.meta.env.VITE_MQTT_URL,
    username: import.meta.env.VITE_MQTT_USERNAME,
    password: import.meta.env.VITE_MQTT_PASSWORD,
  },
};
export type Config = typeof config;