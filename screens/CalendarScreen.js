import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import Dialog from 'react-native-dialog';
import { Avatar, Button, Card, TextInput } from 'react-native-paper';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import { calendarScreen } from '../styles/ProjectStyles.js';
import { fetchAllCalendarEvents } from '../connection/DBConnection';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const CalendarScreen = () => {
  const [items, setItems] = useState({});
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    await fetchAllCalendarEvents()
      .then((res) => {
        setCalendarEvents(res.rows._array);
        // console.log(calendarEvents);
      })
      // .finally(() => console.log('fetchin logi', calendarEvents));
      .then(() => logwriter(calendarEvents));
  };

  const logwriter = (param) => {
    console.log(param);
  };

  useEffect(() => {
    if (loading) {
      fetch();
      console.log('useeff fetch test');
      setLoading(!loading);
    }
    // fetch();
  });

  const loadItems = (day) => {
    const testiString = 'load items string';
    // setTimeout(() => {
    //   for (let i = -15; i < 85; i++) {
    //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //     const strTime = timeToString(time);
    //     if (!items[strTime]) {
    //       items[strTime] = [];
    //       const numItems = Math.floor(Math.random() * 3 + 1);
    //       for (let j = 0; j < numItems; j++) {
    //         items[strTime].push({
    //           name: `Item for ${strTime} #${j}`,
    //           height: Math.max(50, Math.floor(Math.random() * 150)),
    //         });
    //       }
    //     }
    //   }
    //   const newItems = {};
    //   Object.keys(items).forEach((key) => {
    //     newItems[key] = items[key];
    //   });
    //   setItems(newItems);
    // }, 1000);
  };

  const renderItem = (item) => (
    <TouchableOpacity
      style={{
        marginRight: 10,
        marginTop: 17,
      }}
    >
      <Card>
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text>{item.name}</Text>
            <Avatar.Text label="A" />
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={calendarScreen.calendar}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={Date}
        firstDay={1}
        renderItem={renderItem}
        onDayPress={(day) => {
          console.log('day pressed', fetch());
        }}
      />
    </View>
  );
};

export default CalendarScreen;
//   const [selectedDay, setSelectedDay] = useState('');
//   const [eventModalVisible, setEventModalVisible] = useState(false);
//   const [modalDate, setModalDate] = useState('');
//   const [addFieldVisible, setAddFieldVisible] = useState(false);

//   // calendar date string format: yyyy-mm-dd
//   // addCalendarEvent = (userId, dateStart, dateEnd, topic, message)

//   const onDayPress = (day) => {
//     setSelectedDay(day.dateString);
//     console.log(day.dateString);
//     setModalDate(`${day.day}.${day.month}.${day.year}`);
//     setEventModalVisible(true);
//   };

//   return (
//     <View>
//       <View>
//         <Text style={calendarScreen.text} />
//         <Calendar
//           current={Date}
//           style={calendarScreen.calendar}
//           hideExtraDays={false}
//           onDayPress={onDayPress}
//           // longpress for testing purposes
//           onDayLongPress={(day) => {
//             console.log('selected day', day);
//           }}
//           firstDay={1}
//           enableSwipeMonths
//           markedDates={{
//             [selectedDay]: {
//               selected: true,
//               disableTouchEvent: false,
//               selectedColor: '',
//               selectedTextColor: '',
//               dotColor: '',
//             },
//             // testing: marking a day with a dot
//             '2020-10-16': { marked: true },
//           }}
//         />
//       </View>
//       <View>
//         <Dialog.Container visible={eventModalVisible}>
//           <Dialog.Title>{modalDate}</Dialog.Title>
//           <Dialog.Title>topic from db here</Dialog.Title>
//           <Dialog.Description>message from db here:</Dialog.Description>
//           <Dialog.Button
//             label="Close"
//             onPress={() => setEventModalVisible(false)}
//           />
//           <Dialog.Input label="new topic" placeholder="write topic here?" />
//           <Dialog.Input label="new message" placeholder="write message here?" />
//           <Dialog.Button
//             label="Add"
//             onPress={() => setEventModalVisible(false)}
//           />
//         </Dialog.Container>
//       </View>
//       {/* <View visible={addFieldVisible}>
//         <TextInput label="new topic" placeholder="new topic here" />
//         <TextInput label="new message" placeholder="new message here" />
//         <Button label="Cancel" onPress={() => setAddFieldVisible(false)} />
//         <Button label="Add" onPress={() => setAddFieldVisible(false)} />
//       </View> */}
//     </View>
//   );
// };

// export default CalendarScreen;
