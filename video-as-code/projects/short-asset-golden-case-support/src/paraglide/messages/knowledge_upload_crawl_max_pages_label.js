/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Crawl_Max_Pages_LabelInputs */

const en_knowledge_upload_crawl_max_pages_label = /** @type {(inputs: Knowledge_Upload_Crawl_Max_Pages_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Max Pages`)
};

const zh_knowledge_upload_crawl_max_pages_label = /** @type {(inputs: Knowledge_Upload_Crawl_Max_Pages_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最大抓取页数`)
};

/**
* | output |
* | --- |
* | "Max Pages" |
*
* @param {Knowledge_Upload_Crawl_Max_Pages_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_crawl_max_pages_label = /** @type {((inputs?: Knowledge_Upload_Crawl_Max_Pages_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Crawl_Max_Pages_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_crawl_max_pages_label(inputs)
	return zh_knowledge_upload_crawl_max_pages_label(inputs)
});