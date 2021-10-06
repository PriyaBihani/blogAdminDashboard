import {
	countWords,
	calculateReadTime,
	createUniqueTitle,
	createTags,
} from '../helpers/postHelpers';

export const Post = (details) => {
	return {
		uniqueId: createUniqueTitle(details.title) || '',
		title: details.title || '',
		mainImage: details.mainImage || '', // url
		mainImageAlt: details.mainImageAlt,
		createdAt: details.createdAt || new Date().getTime(),
		updatedAt: details.updatedAt || new Date().getTime(),
		categories: details.categories || [], // Array of id's
		tags: createTags(details.tags) || [], // Array of strings
		keywords: details.keywords || '',
		descSnippet: details.descSnippet || '', // blog card description
		createdBy: details.createdBy || {}, // Doc Ref to user.
		metaDesc: details.metaDesc,
		readTime: calculateReadTime(details.content) ?? 0,
		wordCount: countWords(details.content) ?? 0,
		isDraft: details.isDraft || false,
		content: details.content || '',
		isFeatured: false,
	};
};

export const Category = (details) => {
	return {
		id: createUniqueTitle(details.name) || '',
		name: details.name || '',
		color: details.color || '',
		icon: details.svg || '',
		createdAt: details.createdAt || new Date().getTime(),
		updatedAt: details.updatedAt || new Date().getTime(),
	};
};
