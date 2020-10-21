const urlString =
  'https://reactnativeprojectrest.appspot.com/rest/calendarservice';

export const fetchAllCalendarEvents = async () => {
  const eventFetcher = await fetch(`${urlString}/getallcalendarevents`)
    .then((response) => response.json())
    .then((responseJson) => responseJson);
  return eventFetcher;
};
