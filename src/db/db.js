import SQLite from 'react-native-sqlite-storage';

export function initDB(initData) {
  return new Promise((resolve, reject) => {
    global.db = SQLite.openDatabase(
      initData,
      '1.0',
      'main.db',
      200000,
      () => {
        resolve('success');
      },
      err => {
        reject(err);
      },
    );
  });
}
export function getRequestFromDB(query, params = []) {
  return new Promise((resolve, reject) => {
    if (global.db) {
      global.db.transaction(tx => {
        tx.executeSql(
          query,
          params,
          (tx, results) => {
            resolve(results.rows.raw());
          },
          err => reject(err),
        );
      });
    } else {
      resolve({
        insertId: null,
        rows: {
          item: () => null,
          length: 0,
          raw: () => [],
          rowsAffected: 0,
        },
      });
    }
  });
}

export function SQLInsert(query, params = []) {
  return new Promise(async (resolve, reject) => {
    if (global.db) {
      await global.db.transaction(function (txn) {
        txn.executeSql(
          query,
          params,
          function (tx, res) {
            console.log('SQLITE INSERT RESULT:', res);
            resolve(res);
          },
          function (error) {
            reject(error);
          },
        );
      });
    } else {
      resolve({
        insertId: null,
        rows: {
          item: () => null,
          length: 0,
          raw: () => [],
          rowsAffected: 0,
        },
      });
    }
  });
}
export function SQLUpdate(query, params = []) {
  return new Promise(async (resolve, reject) => {
    if (global.db) {
      await global.db.transaction(function (txn) {
        txn.executeSql(
          query,
          params,
          function (tx, res) {
            if (res.rowsAffected > 0) {
              // Data updated
              resolve(res.rowsAffected);
            } else {
              // Data not updated
              resolve(0);
            }
          },
          function (error) {
            console.log('Failed to update:', error);
            reject(error);
          },
        );
      });
    } else {
      resolve({
        insertId: null,
        rows: {
          item: () => null,
          length: 0,
          raw: () => [],
          rowsAffected: 0,
        },
      });
    }
  });
}
export function SQLDelete(query, params = []) {
  return new Promise(async (resolve, reject) => {
    if (global.db) {
      await global.db.transaction(function (txn) {
        txn.executeSql(
          query,
          params,
          function (tx, res) {
            console.log('SQLITE DELETE RESULT:', res);
            if (res.rowsAffected > 0) {
              // Data deleted
              resolve(res.rowsAffected);
            } else {
              // Data not delete
              resolve(0);
            }
          },
          function (error) {
            console.log('Failed to delete:', error);
            reject(error);
          },
        );
      });
    } else {
      resolve({
        insertId: null,
        rows: {
          item: () => null,
          length: 0,
          raw: () => [],
          rowsAffected: 0,
        },
      });
    }
  });
}
