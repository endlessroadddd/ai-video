/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Item_Community_ProfileInputs */

const en_sidebar_item_community_profile = /** @type {(inputs: Sidebar_Item_Community_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Community Profile`)
};

const zh_sidebar_item_community_profile = /** @type {(inputs: Sidebar_Item_Community_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社区画像`)
};

/**
* | output |
* | --- |
* | "Community Profile" |
*
* @param {Sidebar_Item_Community_ProfileInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_community_profile = /** @type {((inputs?: Sidebar_Item_Community_ProfileInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_Community_ProfileInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_item_community_profile(inputs)
	return zh_sidebar_item_community_profile(inputs)
});