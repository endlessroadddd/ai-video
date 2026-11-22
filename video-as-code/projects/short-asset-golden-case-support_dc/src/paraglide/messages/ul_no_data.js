/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_No_DataInputs */

const en_ul_no_data = /** @type {(inputs: Ul_No_DataInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`N/A`)
};

const zh_ul_no_data = /** @type {(inputs: Ul_No_DataInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无`)
};

/**
* | output |
* | --- |
* | "N/A" |
*
* @param {Ul_No_DataInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_no_data = /** @type {((inputs?: Ul_No_DataInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_No_DataInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_no_data(inputs)
	return zh_ul_no_data(inputs)
});