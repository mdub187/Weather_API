// TODO: Define a City class with name and id properties
export class City {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
// TODO: Complete the HistoryService class
class HistoryService {
    // TODO: Define a read method that reads from the searchHistory.json file
    async read() { }
    // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
    async write(cities) { }
    // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
    async getCities() { }
    // TODO Define an addCity method that adds a city to the searchHistory.json file
    async addCity(city) { }
    // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
    async removeCity(id) { }
}
export default new HistoryService();
// REBUILD IN OWN WAY IN JS AND REFACTOR INTO TS SEND INFO TO API TO SEE IF YU CAN GET THE CALLBACK
// CREATE A JS FILE THAT YOU CAN LOAD. 
// USER INPUT TO PING API, AND RENDER DATA
// MKDIR, CP HTML, CREATE A JS FILE 
// "FROM THIS VARIBALE, STORE THE INFO, PING API, THEN GET ARRAY OF VALUES, AND RENDER THAT INFORMATION."
 