/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Client_Chat_Image_Count_LimitInputs */

const en_client_chat_image_count_limit = /** @type {(inputs: Client_Chat_Image_Count_LimitInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`You can upload up to ${i?.count} images.`)
};

const zh_client_chat_image_count_limit = /** @type {(inputs: Client_Chat_Image_Count_LimitInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`最多上传 ${i?.count} 张图片。`)
};

/**
* | output |
* | --- |
* | "You can upload up to {count} images." |
*
* @param {Client_Chat_Image_Count_LimitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_image_count_limit = /** @type {((inputs: Client_Chat_Image_Count_LimitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Image_Count_LimitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_image_count_limit(inputs)
	return zh_client_chat_image_count_limit(inputs)
});