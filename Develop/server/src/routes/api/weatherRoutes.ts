import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  // TODO: save city to search history
});
const request = require('request');

const jar = request.jar();
jar.setCookie(request.cookie('winter_session=eyJpdiI6InBrZE1XamdOT2RLdFROUno5RytHZWc9PSIsInZhbHVlIjoiSUE5bklzT29WSVI5TG1GcG1OdUE4YzYvRW1kSlMxQTMyVGJaNXlDbHduai91Q1ljVkRrWi9wdk5aYzd5TmFrY0NaOXhNcnhEMG9Gd0djNTJDMFk4d09qbHlYaTBHclRzMk0rU1JJZVVJd2U5d2I4cWlIem1HSTZVblJ6WFA0ZGoiLCJtYWMiOiIwMmIyZjZjNTIzNTljMDU4MjM5NmVlOTA3ODkyOTUxZjg2Nzk1MGIzYjYyNjlkNmZlOGQ0OGE4ODY2N2ExMDliIiwidGFnIjoiIn0%25253D'), 'https://mock-36983b445b244fa3b69aa6cd73757b6c.mock.insomnia.rest/forecast5');

const options = {
  method: 'GET',
  url: 'https://mock-36983b445b244fa3b69aa6cd73757b6c.mock.insomnia.rest/forecast5',
  headers: {
    Server: 'nginx/1.24.0',
    Date: 'Mon, 27 Jan 2025 03:44:47 GMT',
    'Content-Type': 'text/html; charset=UTF-8',
    'Transfer-Encoding': 'chunked',
    Connection: 'keep-alive',
    'Cache-Control': 'private, must-revalidate',
    pragma: 'no-cache',
    expires: '-1',
    'Set-Cookie': 'winter_session=eyJpdiI6InBrZE1XamdOT2RLdFROUno5RytHZWc9PSIsInZhbHVlIjoiSUE5bklzT29WSVI5TG1GcG1OdUE4YzYvRW1kSlMxQTMyVGJaNXlDbHduai91Q1ljVkRrWi9wdk5aYzd5TmFrY0NaOXhNcnhEMG9Gd0djNTJDMFk4d09qbHlYaTBHclRzMk0rU1JJZVVJd2U5d2I4cWlIem1HSTZVblJ6WFA0ZGoiLCJtYWMiOiIwMmIyZjZjNTIzNTljMDU4MjM5NmVlOTA3ODkyOTUxZjg2Nzk1MGIzYjYyNjlkNmZlOGQ0OGE4ODY2N2ExMDliIiwidGFnIjoiIn0%3D; expires=Mon, 27 Jan 2025 05:44:47 GMT; Max-Age=7200; path=/; httponly; samesite=lax'
  },
  jar: 'JAR'
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
