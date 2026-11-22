/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Common_Hours_AgoInputs */

const en_common_hours_ago = /** @type {(inputs: Common_Hours_AgoInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} hour(s) ago`)
};

const zh_common_hours_ago = /** @type {(inputs: Common_Hours_AgoInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 小时前`)
};

/**
* | output |
* | --- |
* | "{count} hour(s) ago" |
*
* @param {Common_Hours_AgoInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_hours_ago = /** @type {((inputs: Common_Hours_AgoInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Hours_AgoInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_common_hours_ago(inputs)
	return zh_common_hours_ago(inputs)
});