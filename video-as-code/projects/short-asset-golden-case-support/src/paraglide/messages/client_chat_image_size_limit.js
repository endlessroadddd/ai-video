/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ size: NonNullable<unknown> }} Client_Chat_Image_Size_LimitInputs */

const en_client_chat_image_size_limit = /** @type {(inputs: Client_Chat_Image_Size_LimitInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Images must be smaller than ${i?.size}.`)
};

const zh_client_chat_image_size_limit = /** @type {(inputs: Client_Chat_Image_Size_LimitInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`图片大小不能超过 ${i?.size}。`)
};

/**
* | output |
* | --- |
* | "Images must be smaller than {size}." |
*
* @param {Client_Chat_Image_Size_LimitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_image_size_limit = /** @type {((inputs: Client_Chat_Image_Size_LimitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Image_Size_LimitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_image_size_limit(inputs)
	return zh_client_chat_image_size_limit(inputs)
});