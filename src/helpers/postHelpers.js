export const countWords = (str) => {
	str = str.replace(/(^\s*)|(\s*$)/gi, '');
	str = str.replace(/[ ]{2,}/gi, ' ');
	str = str.replace(/\n /, '\n');
	return str.split(' ').length;
};

export const calculateReadTime = (str) => {
	const words = countWords(str);
	return words / 200;
};

export const createUniqueTitle = (str) => {
	return str.replace(/\s+/g, '-').toLowerCase();
};
