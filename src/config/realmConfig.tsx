import Realm from 'realm';

export const quickStart = async () => {
  try {
    const realm = await Realm.open({
      path: 'betterLists',
      schema: [],
      deleteRealmIfMigrationNeeded: true,
    });

    realm.close();
  } catch (err: any) {
    console.error('Failed to open the realm QuickStart', err.message);
  }
};
