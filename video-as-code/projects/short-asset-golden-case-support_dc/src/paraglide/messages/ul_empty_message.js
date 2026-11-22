/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Empty_MessageInputs */

const en_ul_empty_message = /** @type {(inputs: Ul_Empty_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Empty message content`)
};

const zh_ul_empty_message = /** @type {(inputs: Ul_Empty_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`消息内容为空`)
};

/**
* | output |
* | --- |
* | "Empty message content" |
*
* @param {Ul_Empty_MessageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_empty_message = /** @type {((inputs?: Ul_Empty_MessageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Empty_MessageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_empty_message(inputs)
	return zh_ul_empty_message(inputs)
});