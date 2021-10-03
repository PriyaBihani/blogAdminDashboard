import {
	countWords,
	calculateReadTime,
	createUniqueTitle,
} from '../helpers/postHelpers';

export const Post = (details) => {
	return {
		uniqueId: details.uniqueId || '',
		title: createUniqueTitle(details.title) || '',
		mainImage: details.mainImage || '', // url
		mainImageAlt: details.mainImageAlt,
		createdAt: details.createdAt || new Date().getTime(),
		updatedAt: details.updatedAt || new Date().getTime(),
		categories: details.categories || [],
		tags: details.tags || [],
		keywords: details.keywords || '',
		descSnippet: details.descSnippet || '', // blog card description
		createdBy: details.createdBy || {}, // Doc Ref to user.
		metaDesc: details.metaDesc,
		readTime: calculateReadTime(details.postContent) ?? 0,
		wordCount: countWords(details.postContent) ?? 0,
		isDraft: details.isDraft || false,
		postContent: details.postContent || '',
	};
};
