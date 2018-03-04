import * as Database from '../configureDb';
import { collectionName } from './constants';

export const getDbData = async () => {
  const db = await Database.get();
  const data = await db[collectionName].find().exec();
  return data.map(({ id, key, value, isSynced, markedForDeletion }) => (
    { id, key, value, isSynced, markedForDeletion })
  );
};

export const saveToDb = async (data) => {
  const db = await Database.get();
  await db[collectionName].upsert(data);
  return data;
};

export const findById = async (id) => {
  const db = await Database.get();
  return await db[collectionName].findOne(id).exec();
};

export const updateItemInDb = async ({ id, key, value, isSynced }) => {
  const db = await Database.get();
  const item = await db[collectionName].findOne(id).exec();
  item.set('key', key);
  item.set('value', value);
  item.set('isSynced', isSynced);

  item.save();
  return { id, key, value, isSynced };
};

export const deleteItemFromDb = async (id) => {
  const db = await Database.get();
  const item = await db[collectionName].findOne(id).exec();
  const { key, value, isSynced } = item;
  item.remove();
  return { key, value, isSynced, id };
};

export const markForDeletion = async (id) => {
  const db = await Database.get();
  const item = await db[collectionName].findOne(id).exec();
  const { key, value, isSynced } = item;
  item.set('markedForDeletion', true);

  item.save();
  return { id, key, value, isSynced };
};

export const merge = async (dataToMerge) => {
  await dataToMerge.forEach(item => saveToDb(item));
  return dataToMerge;
};
