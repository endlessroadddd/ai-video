/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Active_7dInputs */

const en_ul_active_7d = /** @type {(inputs: Ul_Active_7dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Active in 7 days`)
};

const zh_ul_active_7d = /** @type {(inputs: Ul_Active_7dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`近 7 天活跃`)
};

/**
* | output |
* | --- |
* | "Active in 7 days" |
*
* @param {Ul_Active_7dInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_active_7d = /** @type {((inputs?: Ul_Active_7dInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Active_7dInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_active_7d(inputs)
	return zh_ul_active_7d(inputs)
});