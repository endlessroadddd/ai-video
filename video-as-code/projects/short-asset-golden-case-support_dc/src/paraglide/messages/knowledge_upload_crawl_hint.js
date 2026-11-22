/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Crawl_HintInputs */

const en_knowledge_upload_crawl_hint = /** @type {(inputs: Knowledge_Upload_Crawl_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The crawler starts from this URL and pushes extracted content into the knowledge pipeline.`)
};

const zh_knowledge_upload_crawl_hint = /** @type {(inputs: Knowledge_Upload_Crawl_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`爬虫将从该 URL 开始抓取，并将内容送入知识处理管线。`)
};

/**
* | output |
* | --- |
* | "The crawler starts from this URL and pushes extracted content into the knowledge pipeline." |
*
* @param {Knowledge_Upload_Crawl_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_crawl_hint = /** @type {((inputs?: Knowledge_Upload_Crawl_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Crawl_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_crawl_hint(inputs)
	return zh_knowledge_upload_crawl_hint(inputs)
});