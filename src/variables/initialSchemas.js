import {
	countWords,
	calculateReadTime,
	createUniqueTitle,
	createTags,
} from '../helpers/postHelpers';

export const Post = (details) => {
	return {
		id: details.id || '',
		uniqueId: createUniqueTitle(details.title) || '',
		title: details.title || '',
		cardImage: details.cardImage || '',
		cardImageAlt: details.cardImageAlt || '',
		descSnippet: details.descSnippet || '', // blog card description
		mainImage: details.mainImage || '', // url
		mainImageAlt: details.mainImageAlt,
		createdAt: details.createdAt || new Date().getTime(),
		updatedAt: new Date().getTime(),
		categories: details.categories || [], // Array of id's
		tags: createTags(details.tags) || [], // Array of strings
		keywords: details.keywords || '',
		createdBy: details.createdBy || {}, // Doc Ref to user.
		metaDesc: details.metaDesc,
		readTime: calculateReadTime(details.content) ?? 0,
		wordCount: countWords(details.content) ?? 0,
		isDraft: details.isDraft || false,
		content: details.content || '',
		isFeatured: details.isFeatured ?? false,
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
