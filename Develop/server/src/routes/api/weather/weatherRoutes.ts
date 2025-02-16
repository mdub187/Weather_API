// import { Router, type Request, type Response } from 'express';
// const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';
// import historyService from '../../service/historyService.js';
// const request = require('request');
// // TODO: POST Request with city name to retrieve weather data
// router.post('/', async (req: Request, res: Response) => {
//   // TODO: GET weather data from city name
//   const request = require('req');

//   const reportData = {
//     method: 'GET',
//     url: 'https://api.openweathermap.org/data/2.5/weather',
//     qs: {
//       appid: '80bdfc0c7bdae9434f8bc5ead971fb55',
//       city: `${req.body.city}`,
//       country: `${req.body.country}`,
//       lat: '',
//       lon: ''
//     },
//     headers: {
//       'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
//       'User-Agent': 'insomnia/10.3.1'
//     },
//     formData: {city: '', country: '', '': ''}
//   };
  
//   request(reportData, function (error, response, body) {
//     if (error) throw new Error(error);
  
//     console.log(body);
//   });
  
//   router.post('/api/report', (req, res) => {
//     const report = req.body;
//     reportData.post(HistoryService).report(report);
//     res.status(200).send('Report received');
//   });
  
//   // // API endpoint to retrieve report data
//   router.get('/api/reports', (req, res) => {
//     res.json(reportData);
//   });
//   // TODO: save city to search history
//   localStorage.setItem("reportData", "text");

// });

// const jar = request.jar();
// jar.setCookie(request.cookie());
//   // 'winter_session=eyJpdiI6InBrZE1XamdOT2RLdFROUno5RytHZWc9PSIsInZhbHVlIjoiSUE5bklzT29WSVI5TG1GcG1OdUE4YzYvRW1kSlMxQTMyVGJaNXlDbHduai91Q1ljVkRrWi9wdk5aYzd5TmFrY0NaOXhNcnhEMG9Gd0djNTJDMFk4d09qbHlYaTBHclRzMk0rU1JJZVVJd2U5d2I4cWlIem1HSTZVblJ6WFA0ZGoiLCJtYWMiOiIwMmIyZjZjNTIzNTljMDU4MjM5NmVlOTA3ODkyOTUxZjg2Nzk1MGIzYjYyNjlkNmZlOGQ0OGE4ODY2N2ExMDliIiwidGFnIjoiIn0%25253D'), 'https://mock-36983b445b244fa3b69aa6cd73757b6c.mock.insomnia.rest/forecast5');

// // const options = {
// //   method: 'GET',
// //   url: 'https://mock-36983b445b244fa3b69aa6cd73757b6c.mock.insomnia.rest/forecast5',
// //   headers: {
// //     Server: 'nginx/1.24.0',
// //     Date: 'Mon, 27 Jan 2025 03:44:47 GMT',
// //     'Content-Type': 'text/html; charset=UTF-8',
// //     'Transfer-Encoding': 'chunked',
// //     Connection: 'keep-alive',
// //     'Cache-Control': 'private, must-revalidate',
// //     pragma: 'no-cache',
// //     expires: '-1',
// //     'Set-Cookie': 'winter_session=eyJpdiI6InBrZE1XamdOT2RLdFROUno5RytHZWc9PSIsInZhbHVlIjoiSUE5bklzT29WSVI5TG1GcG1OdUE4YzYvRW1kSlMxQTMyVGJaNXlDbHduai91Q1ljVkRrWi9wdk5aYzd5TmFrY0NaOXhNcnhEMG9Gd0djNTJDMFk4d09qbHlYaTBHclRzMk0rU1JJZVVJd2U5d2I4cWlIem1HSTZVblJ6WFA0ZGoiLCJtYWMiOiIwMmIyZjZjNTIzNTljMDU4MjM5NmVlOTA3ODkyOTUxZjg2Nzk1MGIzYjYyNjlkNmZlOGQ0OGE4ODY2N2ExMDliIiwidGFnIjoiIn0%3D; expires=Mon, 27 Jan 2025 05:44:47 GMT; Max-Age=7200; path=/; httponly; samesite=lax'
// //   },
// //   jar: 'JAR'
// // };

// // request(options, function (error, response, body) {
// //   if (error) throw new Error(error);

// //   console.log(body);
// // });


// // TODO: GET search history
// router.get('/historyService', async (req: Request, res: Response) => {
//   localStorage.HistoryService.getItem();
// });

// // * BONUS TODO: DELETE city from search history
// //router.delete('/history/:id', async (req: Request, res: Response) => {});

// export default router;


import { Router, type Request, type Response } from 'express';
import axios from 'axios';
import HistoryService from '../../../service/historyService.js';

const router = Router();

// 🔹 POST request to fetch weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const { city, country } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    // OpenWeather API Call
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: `${city},${country || ''}`,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric', // Use 'imperial' for Fahrenheit
      },
    });

    const weatherData = response.data;

    // 🔹 Save to history
    await HistoryService.addCity(city);

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// 🔹 GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to retrieve history' });
  }
});

// 🔹 DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await HistoryService.removeCity(parseInt(id, 10));
    res.json({ message: 'City removed from history' });
  } catch (error) {
    console.error('Error deleting city:', error);
    res.status(500).json({ error: 'Failed to delete city' });
  }
});

export default router;