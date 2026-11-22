/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Col_Last_ActiveInputs */

const en_ul_col_last_active = /** @type {(inputs: Ul_Col_Last_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last Active`)
};

const zh_ul_col_last_active = /** @type {(inputs: Ul_Col_Last_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最后活跃`)
};

/**
* | output |
* | --- |
* | "Last Active" |
*
* @param {Ul_Col_Last_ActiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_col_last_active = /** @type {((inputs?: Ul_Col_Last_ActiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Col_Last_ActiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_col_last_active(inputs)
	return zh_ul_col_last_active(inputs)
});