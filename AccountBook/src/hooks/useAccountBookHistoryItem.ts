import {useCallback} from 'react';
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {AccountBookHistory} from '../data/AccountBookHistory';

SQLite.DEBUG(true);

SQLite.enablePromise(true);

export const useAccountBookHistoryItem = () => {
  const openDB = useCallback<() => Promise<SQLiteDatabase>>(async () => {
    return await SQLite.openDatabase(
      {
        name: 'account_history',
        createFromLocation: '~www/account_history.db',
        location: 'default',
      },
      () => {
        console.log('db성공');
      },
      () => {
        console.log('failure');
      },
    );
  }, []);

  return {
    insertItem: useCallback<
      (item: Omit<AccountBookHistory, 'id'>) => Promise<AccountBookHistory>
    >(
      async item => {
        const db = await openDB();
        const now = new Date().getTime();

        const result = await db.executeSql(
          `
            INSERT INTO account_history (type, price, comment, date, photo_url, created_at, updated_at)
            VALUES (
                "${item.type}",
                ${item.price},
                "${item.comment}",
                ${item.date},
                ${item.photoUrl !== null ? `"${item.photoUrl}"` : null},
                ${now},
                ${now}
            )
        `,
        );

        console.log(result);

        return {
          ...item,
          id: result[0].insertId,
        };
      },
      [openDB],
    ),

    updateItem: useCallback<
      (item: AccountBookHistory) => Promise<AccountBookHistory>
    >(item => {}, []),
  };
};
