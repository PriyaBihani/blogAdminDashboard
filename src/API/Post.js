import * as constants from '../variables/constants';
import { v4 as uuid } from 'uuid';

import {
	doc,
	getDocs,
	setDoc,
	serverTimestamp,
	query,
	collection,
	deleteDoc,
	where,
} from 'firebase/firestore';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import db from '../firebase/database';
import setLoader from '../helpers/setLoader';

export const fetchAllPosts = async (callback) => {
	try {
		let postRef = collection(db, constants.POSTS);
		let postsSnapshot = await getDocs(postRef);

		let posts = [];

		postsSnapshot.forEach((doc) => {
			posts.push(doc.data());
		});

		callback(null, posts);
	} catch (error) {
		console.log(error);
		callback(error.message, null);
	}
};

export const uploadPostAssets = async (
	postImageFile,
	postId,
	imageId = 'mainImage'
) => {
	try {
		if (!postImageFile) throw new Error('No image file provided');

		const storage = getStorage();
		const id = imageId + '-' + uuid().replace(/-/g, '').slice(0, 15);
		const storageRef = ref(storage, `${constants.POSTS}/${postId}/${id}`);

		const uploadImage = uploadBytesResumable(storageRef, postImageFile, {
			contentType: postImageFile.type,
		});

		let val = new Promise((resolve) => {
			uploadImage.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

					setLoader(`Uploading image.. ${progress}`);
				},
				(error) => {
					throw new Error(error.message);
				},
				async () => {
					setLoader('Creating Post');
					const value = await getDownloadURL(uploadImage.snapshot.ref);
					resolve(value);
				}
			);
		});

		let url = await val;
		return url;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createPost = async (post, callback) => {
	try {
		let postsRef = collection(db, constants.POSTS);
		const q = query(postsRef, where('uniqueId', '==', post.uniqueId));

		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty)
			throw new Error('Post with this title already exists');

		let newPost = {
			...post,
			id: uuid().replace(/-/g, '').slice(0, 15),
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		};

		let url;
		if (post.mainImage && Object.keys(post.mainImage).length > 0) {
			url = await uploadPostAssets(post.mainImage, newPost.id);
		}

		if (typeof url === 'string') {
			newPost.mainImage = url;
			let docRef = doc(db, constants.POSTS, newPost.id);
			await setDoc(docRef, newPost);
		} else {
			throw new Error('Error uploading image, please try again later');
		}

		callback(null, {
			...newPost,
		});
	} catch (error) {
		console.log(error);
		callback(error.message, null);
	}
};

export const updatePost = async (post, oldPost, callback) => {
	try {
		let postsRef = collection(db, constants.POSTS);

		// TO check if there is new uniqueId and if it is, it is unique in db.
		if (post.uniqueId !== oldPost.uniqueId) {
			const q = query(postsRef, where('uniqueId', '==', post.uniqueId));

			const querySnapshot = await getDocs(q);

			if (!querySnapshot.empty)
				throw new Error('Post with this title already exists');
		}

		if (typeof post.mainImage === 'object') {
			let url = await uploadPostAssets(post.mainImage, post.id);
			post.mainImage = url;
		}

		if (typeof post.mainImage === 'string') {
			post.updatedAt = serverTimestamp();
			let docRef = doc(db, constants.POSTS, post.id);
			await setDoc(docRef, post, { merge: true });
		} else {
			throw new Error('Error uploading image, please try again later');
		}

		callback(null, post);
	} catch (error) {
		console.log(error);
		callback(error.message, null);
	}
};

export const deletePost = async (post, callback) => {
	try {
		let docRef = doc(db, constants.POSTS, post.id);
		await deleteDoc(docRef);

		return callback(null, post);
	} catch (error) {
		console.log(error);
		callback(error.message, null);
	}
};
