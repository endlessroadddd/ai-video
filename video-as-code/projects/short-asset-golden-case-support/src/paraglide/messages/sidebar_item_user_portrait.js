/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Item_User_PortraitInputs */

const en_sidebar_item_user_portrait = /** @type {(inputs: Sidebar_Item_User_PortraitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User Portrait`)
};

const zh_sidebar_item_user_portrait = /** @type {(inputs: Sidebar_Item_User_PortraitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户画像`)
};

/**
* | output |
* | --- |
* | "User Portrait" |
*
* @param {Sidebar_Item_User_PortraitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_user_portrait = /** @type {((inputs?: Sidebar_Item_User_PortraitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_User_PortraitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_item_user_portrait(inputs)
	return zh_sidebar_item_user_portrait(inputs)
});