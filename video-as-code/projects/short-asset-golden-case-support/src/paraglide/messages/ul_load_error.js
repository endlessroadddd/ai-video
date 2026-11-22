/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Load_ErrorInputs */

const en_ul_load_error = /** @type {(inputs: Ul_Load_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load user list`)
};

const zh_ul_load_error = /** @type {(inputs: Ul_Load_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载用户列表失败`)
};

/**
* | output |
* | --- |
* | "Failed to load user list" |
*
* @param {Ul_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_load_error = /** @type {((inputs?: Ul_Load_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Load_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_load_error(inputs)
	return zh_ul_load_error(inputs)
});