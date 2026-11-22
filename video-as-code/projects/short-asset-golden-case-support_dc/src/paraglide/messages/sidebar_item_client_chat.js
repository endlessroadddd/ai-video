/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Item_Client_ChatInputs */

const en_sidebar_item_client_chat = /** @type {(inputs: Sidebar_Item_Client_ChatInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chat`)
};

const zh_sidebar_item_client_chat = /** @type {(inputs: Sidebar_Item_Client_ChatInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`聊天`)
};

/**
* | output |
* | --- |
* | "Chat" |
*
* @param {Sidebar_Item_Client_ChatInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_client_chat = /** @type {((inputs?: Sidebar_Item_Client_ChatInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_Client_ChatInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_item_client_chat(inputs)
	return zh_sidebar_item_client_chat(inputs)
});