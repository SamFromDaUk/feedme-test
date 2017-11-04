import mongo from '../stores/mongodb';

const create = async (event) => {
  console.log('create', JSON.stringify(event));

  try {
    const db = await mongo();
    const data = {
      created_at: new Date(),
      ...event,
    };

    await db.collection(event.meta.type).insertOne(data);
  } catch (e) {
    console.log(e);
  }
};

const update = async (event) => {
  console.log('update', JSON.stringify(event));

  try {
    const db = await mongo();
    const data = {
      updated_at: new Date(),
      ...event,
    };

    await db.collection(event.meta.type).updateOne({
      id: event.id,
    }, {
      $set: {
        ...data,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export default async (event) => {
  if (event.meta.operation === 'create') {
    create(event);
  }

  if (event.meta.operation === 'update') {
    update(event);
  }
};
