export const formatErrorMessage = (message) => {
  if (message === "Unauthorized: Invalid API key") {
    return "There was an authentication error. Please check your API key.";
  } else if (message === "City not found") {
    return "The specified city was not found. Please check the spelling and try again.";
  } else {
    return "An error occurred while fetching weather data. Please try again later.";
  }
};
