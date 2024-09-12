
import express, { Request, Response, NextFunction } from 'express';
import { getDrugDetails, getProprietaryInfo } from './src/services/drugService';
import { ValidationError } from './src/utils/errors';

const app = express();

// Route for fetching drug details by name
app.get('/drug/:name', async (req: Request, res: Response, next: NextFunction) => {
  const drugName: string = req.params.name;

  if (!drugName) {
    return next(new ValidationError('Drug name is required'));
  }

  try {
    const details = await getDrugDetails(drugName);
    console.log('//??', details)
    res.json(details);
  } catch (error) {
    next(error);
  }
});

// Route for fetching proprietary information by RxCUI
app.get('/proprietary/:rxcui', async (req: Request, res: Response, next: NextFunction) => {
  const rxcui: string = req.params.rxcui;
  
  if (!rxcui) {
    return next(new ValidationError('RxCUI is required'));
  }

  try {
    const proprietaryInfo = await getProprietaryInfo(rxcui); // TODO: need to consider srclist and rxaui
    console.log('...', proprietaryInfo)
    res.json(proprietaryInfo);
  } catch (error) {
    next(error);
  }
});

// Error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof ValidationError ? 400 : 500;
  res.status(statusCode).json({
    error: {
      type: err.name || 'InternalServerError',
      message: err.message || 'An unexpected error occurred'
    }
  });
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
