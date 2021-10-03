import { v4 as uuid } from 'uuid';
import * as constants from '../variables/constants';
import {
	doc,
	getDocs,
	setDoc,
	serverTimestamp,
	query,
	collection,
	where,
} from 'firebase/firestore';
import db from '../firebase/database';

export const fetchAllCategories = async (callback) => {
	try {
		let categoryRef = collection(db, constants.CATEGORIES);
		const categoriesSnapshot = await getDocs(categoryRef);

		let categories = [];

		categoriesSnapshot.forEach((doc) => {
			categories.push(doc.data());
		});

		callback(null, categories);
	} catch (error) {
		console.log(error);
		callback(error.message, null);
	}
};

export const createCategory = async (category, callback) => {
	try {
		if (!category.id) throw new Error('Please try again later.');

		let categoryRef = collection(db, constants.POSTS);
		const q = query(categoryRef, where('id', '==', category.id));
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) throw new Error('This category already exist');

		let newCategory = {
			...category,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		};

		let docRef = doc(db, constants.CATEGORIES, newCategory.id);

		await setDoc(docRef, newCategory);

		return callback(null, newCategory);
	} catch (error) {
		console.log(error);
		callback(error.message, null);
	}
};
