<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
        v-model="searchQuery"
        @input="getSearchResults"
      />

      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
        <p v-if="searchErr">Sorry, something went wrong, please try again.</p>
        <p v-if="!mapboxSearchResults.length">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="item in mapboxSearchResults"
            :key="item.id"
            class="py-2 cursor-pointer"
            @click="previewCity(item)"
          >
            {{ item.name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { City } from "~/types";

const searchQuery = ref("");
const queryTimeout = ref<NodeJS.Timeout>();
const mapboxApiKey = "066812afc881be576ecfcddf0e14d7cf";
const mapboxSearchResults = ref<City[]>();
const searchErr = ref(false);
const router = useRouter();

const previewCity = (city: City) => {
  // console.log(city)
  router.push(
    `/city-view?lat=${city.location}&name=${city.name}&id=${city.id}&preview=true`
  );
};

const getSearchResults = async () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value === "") {
      mapboxSearchResults.value = undefined;
      return;
    }

    try {
      const result = await fetch(
        `https://restapi.amap.com/v3/place/text?keywords=${searchQuery.value}&key=${mapboxApiKey}&citylimit=true`
      );
      const json = await result.json();
      mapboxSearchResults.value = json.pois.map((i: any) => {
        return { id: i.id, name: i.name, location: i.location };
      });
      searchErr.value = false;
    } catch (err) {
      console.error(err);
      searchErr.value = true;
    }
  }, 300);
};
</script>
