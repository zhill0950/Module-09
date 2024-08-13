import fs from 'fs/promises';
import path from 'path';

// TODO: Define a City class with name and id properties
class City {
  constructor(public name: string, public id: string) {}
}

const historyFilePath = path.resolve(__dirname, 'searchHistory.json');
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(historyFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        // If the file doesn't exist, return an empty array
        return [];
      } else {
        throw error;
      }
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(historyFilePath, JSON.stringify(cities, null, 2), 'utf-8');
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  public async getCities(): Promise<City[]> {
    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  public async addCity(cityName: string): Promise<void> {
    const cities = await this.read();
    const id = Date.now().toString(); // Generate a unique ID based on the current timestamp
    const newCity = new City(id, cityName);
    cities.push(newCity);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  public async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }
}

export default new HistoryService();
