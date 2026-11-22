/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Common_Minutes_AgoInputs */

const en_common_minutes_ago = /** @type {(inputs: Common_Minutes_AgoInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} minute(s) ago`)
};

const zh_common_minutes_ago = /** @type {(inputs: Common_Minutes_AgoInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 分钟前`)
};

/**
* | output |
* | --- |
* | "{count} minute(s) ago" |
*
* @param {Common_Minutes_AgoInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_minutes_ago = /** @type {((inputs: Common_Minutes_AgoInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Minutes_AgoInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_common_minutes_ago(inputs)
	return zh_common_minutes_ago(inputs)
});