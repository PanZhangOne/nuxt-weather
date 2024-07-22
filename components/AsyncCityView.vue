<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        You are currently previewing this city, click the + icon to start
        tracking this city.
      </p>
    </div>

    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.query.name }}</h1>
      <p class="text-sm mb-12">
        {{ currDate }}
      </p>
      <p class="text-8xl mb-8">{{ currentWeather?.clouds?.all }}&deg;</p>
      <p>Feels like 38&deg;</p>
      <p class="capitalize">{{ currentWeather?.weather.description }}</p>
      <img
        class="w-[150px] h-auto"
        :src="`https://openweathermap.org/img/wn/${currentWeather?.weather.icon}@2x.png`"
      />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly Weather -->

    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-auto">
          <div class="flex gap-4 items-center">
            <p class="whitespace-nowrap text-md">
              <span>12:00</span>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`https://openweathermap.org/img/wn/${currentWeather?.weather.icon}@2x.png`"
              />
            </p>
            <p class="whitespace-nowrap text-md">
              <span>12:00</span>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`https://openweathermap.org/img/wn/${currentWeather?.weather.icon}@2x.png`"
              />
            </p>
            <p class="whitespace-nowrap text-md">
              <span>12:00</span>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`https://openweathermap.org/img/wn/${currentWeather?.weather.icon}@2x.png`"
              />
            </p>
            <p class="whitespace-nowrap text-md">
              <span>12:00</span>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`https://openweathermap.org/img/wn/${currentWeather?.weather.icon}@2x.png`"
              />
            </p>
            <p class="whitespace-nowrap text-md">
              <span>12:00</span>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`https://openweathermap.org/img/wn/${currentWeather?.weather.icon}@2x.png`"
              />
            </p>
            <p class="whitespace-nowrap text-md">
              <span>12:00</span>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`https://openweathermap.org/img/wn/${currentWeather?.weather.icon}@2x.png`"
              />
            </p>
            <p class="whitespace-nowrap text-md">
              <span>12:00</span>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`https://openweathermap.org/img/wn/${currentWeather?.weather.icon}@2x.png`"
              />
            </p>
            <p class="whitespace-nowrap text-md">
              <span>12:00</span>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`https://openweathermap.org/img/wn/${currentWeather?.weather.icon}@2x.png`"
              />
            </p>
            <p class="whitespace-nowrap text-md">
              <span>12:00</span>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`https://openweathermap.org/img/wn/${currentWeather?.weather.icon}@2x.png`"
              />
            </p>
            <p class="whitespace-nowrap text-md">
              <span>12:00</span>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`https://openweathermap.org/img/wn/${currentWeather?.weather.icon}@2x.png`"
              />
            </p>
            <p class="whitespace-nowrap text-md">
              <span>12:00</span>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`https://openweathermap.org/img/wn/${currentWeather?.weather.icon}@2x.png`"
              />
            </p>
            <p class="whitespace-nowrap text-md">
              <span>12:00</span>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`https://openweathermap.org/img/wn/${currentWeather?.weather.icon}@2x.png`"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeatherData } from "~/types";

const route = useRoute();
const key = "45398d31e6ac26ac76fefd3a6d4f8c81";

const currentWeather = ref<WeatherData>();

const currDate = computed(() => {
  const date = new Date().toLocaleDateString("cn-zh", {
    weekday: "short",
    day: "2-digit",
    month: "long",
  });
  const time = new Date().toLocaleTimeString("cn-zh", { timeStyle: "short" });
  return `${date} ${time}`;
});

const getWeatherData = async () => {
  try {
    let [lat, lon] = (route.query.lat as string).split(",");
    lat = lat.slice(0, 6);
    lon = lon.slice(0, 6);
    // standard
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=10.99&lon=44.34&appid=${key}`
    );
    const weatherData = await result.json();
    currentWeather.value = {
      clouds: weatherData.clouds,
      weather: weatherData.weather[0],
      wind: weatherData.wind,
    };
    // return weatherData;
  } catch (err) {
    console.error(err);
  }
};

getWeatherData();
</script>
