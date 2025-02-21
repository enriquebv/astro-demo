<script setup lang="ts">
import { ref, watch } from 'vue'
import APISDK, { type LaunchesFilter, type Launch } from '../lib/api-sdk'
import { debounce } from '../lib/utils'
import launchesFilterStore from '../stores/launches-filter'

const props = defineProps<{
  initialLaunches?: any[]

  /** Initial search params to pre-populate the store (only used if component is rendered on the server) */
  initialSearchParams?: URLSearchParams
}>()

const apiSDK = new APISDK()
const launches = ref<Launch[]>(props.initialLaunches ?? [])
const ssr = import.meta.env.SSR
const { state: filters } = launchesFilterStore(
  ssr ?
    props.initialSearchParams :
    // On the client, we want to use the store to pre-populate the search params
    new URLSearchParams(window.location.search)
)

async function getLaunches(filters: LaunchesFilter) {
  launches.value = await apiSDK.getLaunches(filters)
}

const debouncedGetLaunches = debounce(getLaunches, 120)
watch(filters, debouncedGetLaunches)


getLaunches(filters)
</script>

<template>
  <p>Mode: {{ ssr ? 'server' : 'client' }}</p>

  <form @submit.prevent>
    <fieldset>
      <legend>Filters</legend>
      <div class="filter-group">
        <label for="name">Name:</label>
        <input id="name" type="text" v-model="filters.name" placeholder="Filter by name" autocomplete="off"/>
      </div>

      <div class="filter-group">
        <label for="shipsCount">Ships Count:</label>
        <input id="shipsCount" type="number" v-model.number="filters.shipsCount" placeholder="Filter by ships count"  autocomplete="off"/>
      </div>

      <div class="filter-group">
        <label for="flightNumber">Flight Number:</label>
        <input id="flightNumber" type="number" v-model.number="filters.flightNumber" placeholder="Filter by flight number" autocomplete="off" />
      </div>
    </fieldset>
  </form>

  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>ships</th>
        <th>flight number</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="launch in launches">
        <td>{{ launch.id }}</td>
        <td>{{ launch.name }}</td>
        <td>{{ launch.ships }}</td>
        <td>{{ launch.flight_number }}</td>
      </tr>
    </tbody>
  </table>
</template>
