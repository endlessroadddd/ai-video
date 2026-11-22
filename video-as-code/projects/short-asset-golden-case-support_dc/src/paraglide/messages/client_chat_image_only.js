/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Image_OnlyInputs */

const en_client_chat_image_only = /** @type {(inputs: Client_Chat_Image_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only image files are supported.`)
};

const zh_client_chat_image_only = /** @type {(inputs: Client_Chat_Image_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`只支持上传图片文件。`)
};

/**
* | output |
* | --- |
* | "Only image files are supported." |
*
* @param {Client_Chat_Image_OnlyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_image_only = /** @type {((inputs?: Client_Chat_Image_OnlyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Image_OnlyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_image_only(inputs)
	return zh_client_chat_image_only(inputs)
});