/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Common_Days_AgoInputs */

const en_common_days_ago = /** @type {(inputs: Common_Days_AgoInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} day(s) ago`)
};

const zh_common_days_ago = /** @type {(inputs: Common_Days_AgoInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 天前`)
};

/**
* | output |
* | --- |
* | "{count} day(s) ago" |
*
* @param {Common_Days_AgoInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_days_ago = /** @type {((inputs: Common_Days_AgoInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Days_AgoInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_common_days_ago(inputs)
	return zh_common_days_ago(inputs)
});