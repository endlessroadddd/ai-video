/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ url: NonNullable<unknown> }} Knowledge_Web_Crawl_CompletedInputs */

const en_knowledge_web_crawl_completed = /** @type {(inputs: Knowledge_Web_Crawl_CompletedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Web crawl completed: ${i?.url}`)
};

const zh_knowledge_web_crawl_completed = /** @type {(inputs: Knowledge_Web_Crawl_CompletedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`网页知识抓取完成：${i?.url}`)
};

/**
* | output |
* | --- |
* | "Web crawl completed: {url}" |
*
* @param {Knowledge_Web_Crawl_CompletedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_web_crawl_completed = /** @type {((inputs: Knowledge_Web_Crawl_CompletedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Web_Crawl_CompletedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_web_crawl_completed(inputs)
	return zh_knowledge_web_crawl_completed(inputs)
});