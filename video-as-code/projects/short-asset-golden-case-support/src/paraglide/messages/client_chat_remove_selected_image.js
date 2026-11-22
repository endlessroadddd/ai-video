/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Remove_Selected_ImageInputs */

const en_client_chat_remove_selected_image = /** @type {(inputs: Client_Chat_Remove_Selected_ImageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Remove selected image`)
};

const zh_client_chat_remove_selected_image = /** @type {(inputs: Client_Chat_Remove_Selected_ImageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`移除已选图片`)
};

/**
* | output |
* | --- |
* | "Remove selected image" |
*
* @param {Client_Chat_Remove_Selected_ImageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_remove_selected_image = /** @type {((inputs?: Client_Chat_Remove_Selected_ImageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Remove_Selected_ImageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_remove_selected_image(inputs)
	return zh_client_chat_remove_selected_image(inputs)
});