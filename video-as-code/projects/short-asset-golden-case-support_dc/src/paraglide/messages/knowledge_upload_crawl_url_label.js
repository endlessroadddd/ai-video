/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Crawl_Url_LabelInputs */

const en_knowledge_upload_crawl_url_label = /** @type {(inputs: Knowledge_Upload_Crawl_Url_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Source URL`)
};

const zh_knowledge_upload_crawl_url_label = /** @type {(inputs: Knowledge_Upload_Crawl_Url_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`抓取入口 URL`)
};

/**
* | output |
* | --- |
* | "Source URL" |
*
* @param {Knowledge_Upload_Crawl_Url_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_crawl_url_label = /** @type {((inputs?: Knowledge_Upload_Crawl_Url_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Crawl_Url_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_crawl_url_label(inputs)
	return zh_knowledge_upload_crawl_url_label(inputs)
});