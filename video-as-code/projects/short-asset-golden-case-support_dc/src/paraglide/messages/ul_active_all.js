/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Active_AllInputs */

const en_ul_active_all = /** @type {(inputs: Ul_Active_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Activity Periods`)
};

const zh_ul_active_all = /** @type {(inputs: Ul_Active_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部活跃周期`)
};

/**
* | output |
* | --- |
* | "All Activity Periods" |
*
* @param {Ul_Active_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_active_all = /** @type {((inputs?: Ul_Active_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Active_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_active_all(inputs)
	return zh_ul_active_all(inputs)
});