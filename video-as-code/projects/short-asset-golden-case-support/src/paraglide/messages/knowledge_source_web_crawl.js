/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Source_Web_CrawlInputs */

const en_knowledge_source_web_crawl = /** @type {(inputs: Knowledge_Source_Web_CrawlInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web Crawl`)
};

const zh_knowledge_source_web_crawl = /** @type {(inputs: Knowledge_Source_Web_CrawlInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`网页抓取`)
};

/**
* | output |
* | --- |
* | "Web Crawl" |
*
* @param {Knowledge_Source_Web_CrawlInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_source_web_crawl = /** @type {((inputs?: Knowledge_Source_Web_CrawlInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Source_Web_CrawlInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_source_web_crawl(inputs)
	return zh_knowledge_source_web_crawl(inputs)
});