import { pickBy } from 'lodash';

export const mapSnapshotToArray = (querySnapshot) => {
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    let obj = Object.assign({}, { id: doc.id }, data);

    if (data.timestamp) {
      const timestamp = Object.assign({}, data.timestamp);
      Object.assign(obj, { timestamp });
    }

    return obj;
  });
}

// Clean object of undefined fields
export const cleanObject = (obj) => {
  return pickBy(obj, v => v !== undefined);
}