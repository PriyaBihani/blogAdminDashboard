import * as constants from '../variables/constants';
import { v4 as uuid } from 'uuid';

import {
	doc,
	getDocs,
	setDoc,
	serverTimestamp,
	query,
	collection,
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
		// check if unique title is already present
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
