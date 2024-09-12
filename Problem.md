Challenge Description: National Library of Medicine API Integration

Your task is to create a Node.js application that consumes the National Library of Medicine (NLM) API endpoints to retrieve drug details and drug interactions. You will be working with two API endpoints: one for retrieving drug details and another for fetching drug interactions.

Requirements:

  1. Implement a Node.js application that can make HTTP requests to the NLM API endpoints.
  2. Create a function that accepts a drug name as input and retrieves the drug details from the NLM API. The drug details endpoint is https://rxnav.nlm.nih.gov/REST/drugs.json?name={drug name}.
  3. Parse the response from the drug details endpoint and extract relevant information such as drug name, active ingredients, dosage forms, rxcui and any other details you find important.
  4. Create another function that accepts an RxCUI as input and retrieves the proprietary information from the NLM API. The proprietary information endpoint is https://rxnav.nlm.nih.gov/REST/rxcui/{rxcui}/proprietary.xml?srclist=yourList&rxaui=yourRxaui.
  5. Parse the response from the get proprietary information endpoint and extract the proprietary information and any additional details provided.
  6. Ensure proper error handling for API requests and responses.
  7. Design and implement appropriate data structures to store and represent the drug details and proprietary info.
  8. Write clear and concise code with proper documentation and comments.
  9. Include appropriate error handling and error responses.
  10. Implement input validation and handle edge cases (e.g., empty drug name, invalid RxCUI, etc.).
  11. Include unit tests for your function with mock responses from the NLM API.
  12. Include a README file explaining how to set up the application.

Feel free to use any Node.js libraries or tools that you find appropriate for the task.

Please create a branch of this repository to store your completed project.

Note: The NLM API documentation provides further details on the response structure and available query parameters.

  Get Drugs: https://lhncbc.nlm.nih.gov/RxNav/APIs/api-RxNorm.getDrugs.html
  Get Proprietary Information: https://lhncbc.nlm.nih.gov/RxNav/APIs/api-RxNorm.getProprietaryInformation.html

Good luck, and happy coding!