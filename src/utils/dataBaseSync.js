import * as Database from '../Database';

export const loadFromDb = async () => {
  const db = await Database.get();

  const sub = db.formdata.find()
    .sort({ key: 1 }).$.subscribe(data => {
      if (!data) { return }
      this.setState({ data });
    });

  this.subs.push(sub);
};
