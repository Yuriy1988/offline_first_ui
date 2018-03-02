import * as Database from '../Database';

export const loadFromDb = async () => {
  const db = await Database.get();
  const data = await db.formdata.find().exec();
  return data.map(({ id, key, value, isSynced }) => ({ id, key, value, isSynced }));
};
