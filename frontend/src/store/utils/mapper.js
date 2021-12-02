export const mapSnapshotToArray = (querySnapshot) => {
  return querySnapshot.docs.map(doc => {
    return JSON.parse(JSON.stringify(doc.data()));
  });
}