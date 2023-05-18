import Realm from 'realm';

export const quickStart = async () => {
  try {
    const realm = await Realm.open({
      path: 'betterLists',
      schema: [
        {
          name: 'item',
          properties: {
            id: 'string',
            index: 'int',
            category: 'string',
            completed: 'bool',
            listId: 'string',
            price: {type: 'float', default: 0.0},
            title: 'string',
          },
          primaryKey: 'id',
        },
        {
          name: 'lists',
          properties: {
            id: 'string',
            categories: {
              type: 'string[]',
              default: [],
            },
            expandAll: {type: 'bool', default: false},
            icon: 'string',
            items: {
              type: 'list',
              default: [],
              objectType: 'item',
            },
            orderByNameAsc: {type: 'bool', default: true},
            orderByPriceAsc: {type: 'bool', default: true},
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
