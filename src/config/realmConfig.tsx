import Realm from 'realm';

export const quickStart = async () => {
  try {
    const realm = await Realm.open({
      path: 'betterLists',
      schema: [
        {
          name: 'lists',
          properties: {
            id: 'string',
            categories: {
              type: 'string[]',
              default: [],
            },
            icon: 'string',
            items: {
              type: 'string[]',
              default: [],
            },
            showCompleted: {type: 'bool', default: true},
            title: 'string',
            total: {type: 'int', default: 0},
            type: 'string',
          },
          primaryKey: 'id',
        },
      ],
      deleteRealmIfMigrationNeeded: true,
    });

    realm.close();
  } catch (err: any) {
    console.error('Failed to open the realm QuickStart', err.message);
  }
};
