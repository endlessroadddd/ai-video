/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Active_30dInputs */

const en_ul_active_30d = /** @type {(inputs: Ul_Active_30dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Active in 30 days`)
};

const zh_ul_active_30d = /** @type {(inputs: Ul_Active_30dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`近 30 天活跃`)
};

/**
* | output |
* | --- |
* | "Active in 30 days" |
*
* @param {Ul_Active_30dInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_active_30d = /** @type {((inputs?: Ul_Active_30dInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Active_30dInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_active_30d(inputs)
	return zh_ul_active_30d(inputs)
});