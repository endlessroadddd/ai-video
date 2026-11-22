/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Crawl_Url_PlaceholderInputs */

const en_knowledge_upload_crawl_url_placeholder = /** @type {(inputs: Knowledge_Upload_Crawl_Url_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`e.g. https://docs.example.com`)
};

const zh_knowledge_upload_crawl_url_placeholder = /** @type {(inputs: Knowledge_Upload_Crawl_Url_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`例如 https://docs.example.com`)
};

/**
* | output |
* | --- |
* | "e.g. https://docs.example.com" |
*
* @param {Knowledge_Upload_Crawl_Url_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_crawl_url_placeholder = /** @type {((inputs?: Knowledge_Upload_Crawl_Url_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Crawl_Url_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_crawl_url_placeholder(inputs)
	return zh_knowledge_upload_crawl_url_placeholder(inputs)
});