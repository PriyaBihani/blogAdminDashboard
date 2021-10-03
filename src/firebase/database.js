import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

import app from './index';

const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 3000);

export default db;
