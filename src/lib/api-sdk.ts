export interface LaunchesFilter {
  name?: string;
  shipsCount?: number;
  flightNumber?: number
}

export interface Launch {
  id: string
  name: string
  ships: number
  flight_number: number
}

// Disclaimer: This is just a demo, so we are not implementing real pagination or filtering

export default class APISDK {
  private fetch(): Promise<any[]> {
    return fetch('https://api.spacexdata.com/v4/launches/past')
      .then((response) => response.json())
  }

  async getLaunches(filters: LaunchesFilter): Promise<Launch[]> {
    console.log('getLaunches', filters)

    let data = await this.fetch().then(data => data.map(launch => ({
      id: launch.id,
      name: launch.name,
      ships: launch.ships.length,
      flight_number: launch.flight_number,
    })))

    if (filters.name) {
      data = data.filter((launch) => launch.name.toLowerCase().includes(filters.name?.toLowerCase()))
    }

    if (filters.shipsCount) {
      data = data.filter((launch) => launch.ships === filters.shipsCount)
    }

    if (filters.flightNumber) {
      data = data.filter((launch) => launch.flight_number === filters.flightNumber)
    }

    return data
  }
}
