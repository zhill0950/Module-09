import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const { cityName } = req.body;

    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }

    // Get weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(cityName);

    // Save city to search history
    await HistoryService.addCity(cityName);

    // Send the weather data back to the client
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get weather data' });
  }
});

// GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

// DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await HistoryService.removeCity(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete city from search history' });
  }
});

export default router;


// import { Router, type Request, type Response } from 'express';
// const router = Router();

// // import HistoryService from '../../service/historyService.js';
// // import WeatherService from '../../service/weatherService.js';

// // TODO: POST Request with city name to retrieve weather data
// router.post('/', (req: Request, res: Response) => {
//   // TODO: GET weather data from city name
//   // TODO: save city to search history
// });

// // TODO: GET search history
// router.get('/history', async (req: Request, res: Response) => {});

// // * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req: Request, res: Response) => {});

// export default router;
