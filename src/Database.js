import RxDB from 'rxdb';

RxDB.plugin(require('pouchdb-adapter-idb'));

const collections = [
  {
    name: 'formdata',
    schema: require('./Schema.js').default,
    sync: false,
  },
];

let dbPromise = null;

const _create = async function () {
  const db = await RxDB.create({
    name: 'formdatadb',
    adapter: 'idb',
  });
  console.log('DatabaseService: created database');
  window['db'] = db; // write to window for debugging


  // create collections
  console.log('DatabaseService: create collections');
  await Promise.all(collections.map(colData => db.collection(colData)));

  // hooks
  console.log('DatabaseService: add hooks');
  db.collections.formdata.preInsert(function (docObj) {
    const value = docObj.value;
    return db.collections.formdata.findOne({ value }).exec().then(has => {
      if (has != null) {
        alert('another hero already has the value ' + value);
        throw new Error('value already there');
      }
      return db;
    });
  });

  console.log('DatabaseService: sync');
  return db;
};

export function get() {
  if (!dbPromise)
    dbPromise = _create();
  return dbPromise;
}
