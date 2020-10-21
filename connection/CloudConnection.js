const urlString =
  'https://reactnativeprojectrest.appspot.com/rest/calendarservice';

export const fetchAllCalendarEvents = async () => {
  const eventFetcher = await fetch(`${urlString}/getallcalendarevents`)
    .then((response) => response.json())
    .then((responseJson) => responseJson);
  return eventFetcher;
};

export const fetchAllPlayer = async () => {
  await fetch(
    'https://reactnativeprojectrest.appspot.com/rest/floorballservice/getallplayers'
  )
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    });
};
