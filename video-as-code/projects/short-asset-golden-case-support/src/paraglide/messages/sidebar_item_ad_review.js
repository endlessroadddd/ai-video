/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Item_Ad_ReviewInputs */

const en_sidebar_item_ad_review = /** @type {(inputs: Sidebar_Item_Ad_ReviewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ads Moderation`)
};

const zh_sidebar_item_ad_review = /** @type {(inputs: Sidebar_Item_Ad_ReviewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`广告审查`)
};

/**
* | output |
* | --- |
* | "Ads Moderation" |
*
* @param {Sidebar_Item_Ad_ReviewInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_ad_review = /** @type {((inputs?: Sidebar_Item_Ad_ReviewInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_Ad_ReviewInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_item_ad_review(inputs)
	return zh_sidebar_item_ad_review(inputs)
});