/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} App_DescriptionInputs */

const en_app_description = /** @type {(inputs: App_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`An autonomous AI teammate that learns from your community and works with your team, just like a real human would.`)
};

const zh_app_description = /** @type {(inputs: App_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`像真人同事一样，能从你的社区中学习并与你的团队协作的 AI 队友。`)
};

/**
* | output |
* | --- |
* | "An autonomous AI teammate that learns from your community and works with your team, just like a real human would." |
*
* @param {App_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const app_description = /** @type {((inputs?: App_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<App_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_app_description(inputs)
	return zh_app_description(inputs)
});