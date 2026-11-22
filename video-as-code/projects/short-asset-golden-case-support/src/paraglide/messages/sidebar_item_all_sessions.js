/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Item_All_SessionsInputs */

const en_sidebar_item_all_sessions = /** @type {(inputs: Sidebar_Item_All_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Sessions`)
};

const zh_sidebar_item_all_sessions = /** @type {(inputs: Sidebar_Item_All_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所有会话`)
};

/**
* | output |
* | --- |
* | "All Sessions" |
*
* @param {Sidebar_Item_All_SessionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_all_sessions = /** @type {((inputs?: Sidebar_Item_All_SessionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_All_SessionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_item_all_sessions(inputs)
	return zh_sidebar_item_all_sessions(inputs)
});