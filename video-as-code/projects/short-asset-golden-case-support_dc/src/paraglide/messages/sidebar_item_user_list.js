/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Item_User_ListInputs */

const en_sidebar_item_user_list = /** @type {(inputs: Sidebar_Item_User_ListInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User List`)
};

const zh_sidebar_item_user_list = /** @type {(inputs: Sidebar_Item_User_ListInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户列表`)
};

/**
* | output |
* | --- |
* | "User List" |
*
* @param {Sidebar_Item_User_ListInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_user_list = /** @type {((inputs?: Sidebar_Item_User_ListInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_User_ListInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_item_user_list(inputs)
	return zh_sidebar_item_user_list(inputs)
});