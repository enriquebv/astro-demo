import { reactive, watch } from 'vue'
import { type LaunchesFilter } from '../lib/api-sdk'

const state = reactive<LaunchesFilter>({
  name: '',
  shipsCount: 0,
  flightNumber: 0,
})

if (globalThis.window) {
  watch(state, (updatedState) => {
    const queryParams = new URLSearchParams(window.location.search)
    if (updatedState.name) {
      queryParams.set('name', updatedState.name)
    } else {
      queryParams.delete('name')
    }
    if (updatedState.shipsCount) {
      queryParams.set('shipsCount', updatedState.shipsCount.toString())
    } else {
      queryParams.delete('shipsCount')
    }
    if (updatedState.flightNumber) {
      queryParams.set('flightNumber', updatedState.flightNumber.toString())
    } else {
      queryParams.delete('flightNumber')
    }

    window.history.replaceState(null, '', `${window.location.pathname}?${queryParams.toString()}`)
  })
}


export default function launchesFilterStore(searchParams?: URLSearchParams) {
  if (searchParams) {
    const name = searchParams.get('name') ?? ''
    const shipsCount = searchParams.get('shipsCount') ?? '0'
    const flightNumber = searchParams.get('flightNumber') ?? '0'
    state.name = name
    state.shipsCount = parseInt(shipsCount)
    state.flightNumber = parseInt(flightNumber)
  }

  return {
    state,
  }
}
