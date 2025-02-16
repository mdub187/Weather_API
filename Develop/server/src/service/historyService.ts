// import fs from 'node:fs/promises';
// // Define a City class with name and id properties
// export class City {
//   id: number;
//   name: string;
//   // constructor function
//   constructor(id: number, name: string) {
//     this.id = id;
//     this.name = name;
//   }
// }

// class HistoryService { 
//   // refrence to db.json
//   // Define a read method that reads from the searchHistory.json file
//   private async read() {
//     const cities: string = await fs.readFile('/db/db.json', 'utf8');
//   return cities;
//   };

//   // Define a write method that writes the updated cities array to the searchHistory.json file
//   private async write(cities: City[]) {
//     await fs.writeFile('db/db.json', JSON.stringify(cities, null, '\t'));
//   }
//   // Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
//   async getCities() {
//     const cities = await this.read();
//     return JSON.parse(cities);
//   }
//   // Define an addCity method that adds a city to the searchHistory.json file
//   async addCity(city: string) {
//     const cities = await this.getCities();
//     const newCity = new City(cities.length + 1, city);
//     cities.push(newCity);
//     await this.write(cities);
//   }
//   // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
//   async removeCity(id: string) {}
// }

// export default new HistoryService();


import fs from 'node:fs/promises';

// Define a City class
export class City {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class HistoryService {
  private filePath = './db/db.json';

  // Read method: Reads from db.json
  private async read(): Promise<string> {
    try {
      return await fs.readFile(this.filePath, 'utf8');
    } catch (error) {
      console.error('Error reading search history:', error);
      return '[]'; // Return empty JSON array if file doesn't exist or fails
    }
  }

  // Write method: Writes updated cities array to db.json
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    } catch (error) {
      console.error('Error writing search history:', error);
    }
  }

  // Get cities from db.json
  async getCities(): Promise<City[]> {
    const data = await this.read();
    try {
      return JSON.parse(data) as City[];
    } catch (error) {
      console.error('Error parsing search history:', error);
      return [];
    }
  }

  // Add a city to db.json
  async addCity(name: string): Promise<void> {
    const cities = await this.getCities();
    const newCity = new City(cities.length + 1, name);
    cities.push(newCity);
    await this.write(cities);
  }

  // Remove a city from db.json by ID
  async removeCity(id: number): Promise<void> {
    let cities = await this.getCities();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
}

export default new HistoryService();