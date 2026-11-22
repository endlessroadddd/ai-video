/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Crawl_TabInputs */

const en_knowledge_upload_crawl_tab = /** @type {(inputs: Knowledge_Upload_Crawl_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Crawl URL`)
};

const zh_knowledge_upload_crawl_tab = /** @type {(inputs: Knowledge_Upload_Crawl_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`网页抓取`)
};

/**
* | output |
* | --- |
* | "Crawl URL" |
*
* @param {Knowledge_Upload_Crawl_TabInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_crawl_tab = /** @type {((inputs?: Knowledge_Upload_Crawl_TabInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Crawl_TabInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_crawl_tab(inputs)
	return zh_knowledge_upload_crawl_tab(inputs)
});