/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Upload_ImageInputs */

const en_client_chat_upload_image = /** @type {(inputs: Client_Chat_Upload_ImageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Upload image`)
};

const zh_client_chat_upload_image = /** @type {(inputs: Client_Chat_Upload_ImageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传图片`)
};

/**
* | output |
* | --- |
* | "Upload image" |
*
* @param {Client_Chat_Upload_ImageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_upload_image = /** @type {((inputs?: Client_Chat_Upload_ImageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Upload_ImageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_upload_image(inputs)
	return zh_client_chat_upload_image(inputs)
});