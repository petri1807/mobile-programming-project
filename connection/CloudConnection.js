const urlString = 'https://reactnativeprojectrest.appspot.com/rest';

export const fetchAllCalendarEvents = async () => {
  const eventFetcher = await fetch(
    `${urlString}/calendarservice/getallcalendarevents`
  )
    .then((response) => response.json())
    .then((responseJson) => responseJson);
  return eventFetcher;
};

export const addCalendarEvent = async (
  userId,
  date,
  timeStart,
  timeEnd,
  topic,
  message
) => {
  await fetch(`${urlString}/calendarservice/addcalendarevent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: 1,
      date,
      timeStart,
      timeEnd,
      topic,
      message,
    }),
  });
  console.log('cloudconn consolelog:');
  console.log(topic);
};

export const deleteCalendarEvent = async (id) => {
  await fetch(`${urlString}/calendarservice/deletecalendarevent/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.text()) // or res.json()
    .then((res) => console.log(res));
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

export const fetchAllActivities = async () => {
  const activitiesFetcher = await fetch(
    `${urlString}/activityservice/getallactivities`
  )
    .then((response) => response.json())
    .then((responseJson) => responseJson);
  return activitiesFetcher;
};

export const addActivity = async (
  userId,
  date,
  timeStart,
  timeEnd,
  timeSpent,
  activityType
) => {
  await fetch(`${urlString}/activityservice/addactivity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: 0,
      date,
      timeStart,
      timeEnd,
      timeSpent,
      activityType,
    }),
  });
  console.log('New activity added, maybe....');
};

export const fetchAllAnnouncements = async (date) => {
  const announcementFetcher = await fetch(
    `${urlString}/announcementservice/getallannouncements`
  )
    .then((response) => response.json())
    .then((responseJson) => responseJson);
  return announcementFetcher;
};
