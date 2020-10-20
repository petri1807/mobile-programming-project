const urlString =
  'https://reactnativeprojectrest.appspot.com/rest/calendarservice';

export const fetchAllCalendarEvents = async () => {
  await fetch(`${urlString}/getallcalendarevents`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    });
};
