import localforage from 'localforage';

const lfInstance = localforage.createInstance({
  description: 'LocalForage',
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  name: 'sync_videos_db',
  storeName: 'VodsStore',
});

export default lfInstance;
