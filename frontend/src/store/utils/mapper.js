import { pickBy } from 'lodash';

export const mapSnapshotToArray = (querySnapshot) => {
  return querySnapshot.docs.map(doc => {
    return Object.assign({}, doc.data());
  });
}

// Clean object of undefined fields
export const cleanObject = (obj) => {
  return pickBy(obj, v => v !== undefined);
}