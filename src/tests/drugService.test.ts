import { getDrugDetails, getProprietaryInfo } from '../services/drugService';
import axios from 'axios';
import { ValidationError, ApiError } from '../utils/errors';
import { parseStringPromise } from 'xml2js';

jest.mock('axios');
jest.mock('xml2js', () => ({
  parseStringPromise: jest.fn(),
}));

describe('DrugService', () => {
  // Test for getDrugDetails
  it('should retrieve drug details for a valid drug name', async () => {
    const mockResponse = { data: { drugGroup: { conceptGroup: [{ tty: "IN", conceptProperties: [] }] } } };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockResponse);

    const drugDetails = await getDrugDetails('Aspirin');
    expect(drugDetails).toBeDefined();
  });

  it('should throw an error for an empty drug name', async () => {
    await expect(getDrugDetails('')).rejects.toThrow(ValidationError);
  });

  it('should throw an API error if drug details not found', async () => {
    const mockResponse = { response: { status: 404 } };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(mockResponse);

    await expect(getDrugDetails('InvalidDrug')).rejects.toThrow(ApiError);
  });

  // Updated tests for getProprietaryInfo
  it('should retrieve proprietary information for a valid RxCUI and parse XML to JSON', async () => {
    const mockXMLResponse = '<proprietaryInfo><someKey>someValue</someKey></proprietaryInfo>';
    const mockParsedJSON = { proprietaryInfo: { someKey: 'someValue' } };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockXMLResponse });
    (parseStringPromise as jest.MockedFunction<typeof parseStringPromise>).mockResolvedValue(mockParsedJSON);

    const proprietaryInfo = await getProprietaryInfo('123456', 'RXNORM', '123');
    expect(proprietaryInfo).toEqual(mockParsedJSON);
  });

  it('should throw an error for an empty RxCUI', async () => {
    await expect(getProprietaryInfo('', 'RXNORM', '123')).rejects.toThrow(ValidationError);
  });

  it('should throw an API error if proprietary information is not found', async () => {
    const mockResponse = { response: { status: 404 } };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(mockResponse);

    await expect(getProprietaryInfo('InvalidRxCUI', 'RXNORM', '123')).rejects.toThrow(ApiError);
  });

  it('should throw an API error when XML parsing fails', async () => {
    const mockXMLResponse = '<invalidXML>';
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockXMLResponse });
    (parseStringPromise as jest.MockedFunction<typeof parseStringPromise>).mockRejectedValue(new Error('XML Parsing Error'));

    await expect(getProprietaryInfo('123456', 'RXNORM', '123')).rejects.toThrow('Error fetching proprietary information: XML Parsing Error');
  });
});