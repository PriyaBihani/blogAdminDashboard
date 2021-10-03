export const Post = (details) => {
	return {
		uniqueId: details.uniqueId || '',
		title: details.title || '',
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
		readTime: details.readTime || 0,
		wordCount: details.wordCount || 0,
		isDraft: details.isDraft || false,
		postContent: details.postContent || '',
	};
};
