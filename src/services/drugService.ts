
import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';
import { ApiError, ValidationError } from '../utils/errors';
import { parseStringPromise } from 'xml2js';

interface DrugDetails {
  tty: string;
  conceptProperties: any[];
}

export const getDrugDetails = async (drugName: string): Promise<DrugDetails[]> => {
  if (!drugName || typeof drugName !== 'string') {
    throw new ValidationError('Invalid drug name');
  }

  try {
    const response = await axios.get(`${BASE_URL}/drugs.json?name=${encodeURIComponent(drugName)}`);
    const drugDetails = response.data;

    if (!drugDetails || !drugDetails.drugGroup || !drugDetails.drugGroup.conceptGroup) {
      throw new ApiError('Drug details not found');
    }

    return drugDetails.drugGroup.conceptGroup;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw new ApiError('Drug not found');
    }
    throw new ApiError(`Error fetching drug details: ${error.message}`);
  }
};

export const getProprietaryInfo = async (rxcui: string, srclist?: string, rxaui?: string): Promise<any> => {
  if (!rxcui || typeof rxcui !== 'string') {
    throw new ApiError('Invalid RxCUI');
  }

  try {
    let url = `${BASE_URL}/rxcui/${rxcui}/proprietary.xml`;

    const queryParams: string[] = [];
    if (srclist) {
      queryParams.push(`srclist=${srclist}`);
    }
    if (rxaui) {
      queryParams.push(`rxaui=${rxaui}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    const response = await axios.get(url);

    // Parse the XML response into JSON
    const jsonResult = await parseStringPromise(response.data);

    return jsonResult;
  } catch (error: any) {
    throw new ApiError(`Error fetching proprietary information: ${error.message}`);
  }
};
