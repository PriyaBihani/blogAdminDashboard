import * as constants from '../variables/constants';
import { v4 as uuid } from 'uuid';

import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
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

		var val = new Promise(resolve => {
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
					// console.log('sdf', uploadImage.snapshot.ref)
					const value = await getDownloadURL(uploadImage.snapshot.ref)
					resolve(value)
				}
			)
		});

		var value = await val
		return value
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createPost = async (post, callback) => {
	try {
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
		console.log(url);
		if (typeof url === 'string') {
			newPost.mainImage = url;
			await setDoc(doc(db, constants.POSTS, newPost.id), newPost);
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
