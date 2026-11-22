/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Crawl_Url_RequiredInputs */

const en_knowledge_upload_crawl_url_required = /** @type {(inputs: Knowledge_Upload_Crawl_Url_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter a valid URL (http/https)`)
};

const zh_knowledge_upload_crawl_url_required = /** @type {(inputs: Knowledge_Upload_Crawl_Url_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入有效的 URL（http/https）`)
};

/**
* | output |
* | --- |
* | "Please enter a valid URL (http/https)" |
*
* @param {Knowledge_Upload_Crawl_Url_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_crawl_url_required = /** @type {((inputs?: Knowledge_Upload_Crawl_Url_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Crawl_Url_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_crawl_url_required(inputs)
	return zh_knowledge_upload_crawl_url_required(inputs)
});