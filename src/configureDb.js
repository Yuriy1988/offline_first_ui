import RxDB from 'rxdb';
import schema from './schema';
import { collectionName } from './utils/constants';

RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-websql'));
RxDB.plugin(require('pouchdb-adapter-cordova-sqlite'));

const collections = [
  {
    name: collectionName,
    schema,
    sync: false,
  },
];

let dbPromise = null;

const _create = async function () {
  const db = await RxDB.create({
    name: `${collectionName}db`,
    adapter: 'idb',
  });

  await Promise.all(collections.map(colData => db.collection(colData)));
  return db;
};

export function get() {
  if (!dbPromise)
    dbPromise = _create();
  return dbPromise;
}
