import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('app.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Announements
      tx.executeSql(
        'create table if not exists announcement(id integer not null primary key, date text not null, title text not null, content text not null);',
        // 'drop table announcement;',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
      // Calendar event
      tx.executeSql(
        'create table if not exists calendarEvent(id integer not null primary key, userId integer not null, dateStart text not null, dateEnd text not null, topic text not null, message text not null);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
      // Floorball game event
      tx.executeSql(
        'create table if not exists floorballGame(id integer not null primary key, dateStart text not null, dateEnd text not null);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
      tx.executeSql(
        'create table if not exists players(id integer not null primary key, player text not null);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
      // Floorball game participant
      tx.executeSql(
        'create table if not exists floorballParticipant(id integer not null primary key, userId integer not null, gameId integer not null);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
      // Activity event
      tx.executeSql(
        'create table if not exists activity(id integer not null primary key, userId integer not null, date text not null, time integer not null, activityType text not null);',
        // 'drop table activity;',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );

      // User
      tx.executeSql(
        'create table if not exists user(id integer not null primary key, firstName text not null, lastName text not null, email text not null);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

// DATE as strings ("YYYY-MM-DD HH:MM:SS.SSS")

export const addAnnouncement = (date, title, content) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'insert into announcement(date, title, content) values(?,?,?)',
        [date, title, content],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const addCalendarEvent = (
  userId,
  dateStart,
  dateEnd,
  topic,
  message
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'insert into calendarEvent(userId, dateStart, dateEnd, topic, message) values(?,?,?,?,?)',
        [userId, dateStart, dateEnd, topic, message],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const addFloorballGame = (dateStart, dateEnd) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'insert into floorballGame(dateStart, dateEnd) values(?,?)',
        [dateStart, dateEnd],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const addPlayer = (player) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'insert into players(player) values(?)',
        [player],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const fetchAllPlayers = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Here we select all from the table fish
      tx.executeSql(
        'select * from players;',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const addActivity = (userId, date, time, activityType) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'insert into activity(userId, date, time, activityType) values(?,?,?,?)',
        [userId, date, time, activityType],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const addUser = (firstName, lastName, email) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'insert into user(firstName, lastName, email) values(?,?,?)',
        [firstName, lastName, email],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const addFloorballParticipant = (gameId, userId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'insert into floorballParticipant(gameId, userId) values(?,?)',
        [gameId, userId],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteCalendarEvent = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'delete from calendarEvent where id=?',
        [id],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchAllAnnouncements = (date) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from announcement where date=?',
        [date],
        (tx, result) => {
          resolve(result);
        },
        (tx, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchTodaysCalendarEventsForUser = (userId, date) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from calendarEvent where userId=? and dateStart=?',
        [userId, date],
        (tx, result) => {
          resolve(result);
        },
        (tx, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchAllCalendarEvents = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from calendarEvent',
        [],
        (tx, result) => {
          resolve(result);
        },
        (tx, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchAllFloorballGames = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from floorballGame',
        [],
        (tx, result) => {
          resolve(result);
        },
        (tx, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchAllFloorballParticipants = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from floorballParticipant',
        [],
        (tx, result) => {
          resolve(result);
        },
        (tx, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchAllActivities = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from activity',
        [],
        (tx, result) => {
          resolve(result);
        },
        (tx, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchActivityTypeSum = (userId, type) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'select sum(activityType) from activity where userId=? and activityType=?',
        // 'select * from activity where userId=? and activityType=?',
        [userId, type],
        (tx, result) => {
          resolve(result);
        },
        (tx, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
