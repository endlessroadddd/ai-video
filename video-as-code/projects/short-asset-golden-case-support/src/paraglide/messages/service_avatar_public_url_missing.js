/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Avatar_Public_Url_MissingInputs */

const en_service_avatar_public_url_missing = /** @type {(inputs: Service_Avatar_Public_Url_MissingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Avatar upload succeeded, but no public URL was returned.`)
};

const zh_service_avatar_public_url_missing = /** @type {(inputs: Service_Avatar_Public_Url_MissingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`头像上传成功，但未获取到可访问地址。`)
};

/**
* | output |
* | --- |
* | "Avatar upload succeeded, but no public URL was returned." |
*
* @param {Service_Avatar_Public_Url_MissingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_avatar_public_url_missing = /** @type {((inputs?: Service_Avatar_Public_Url_MissingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Avatar_Public_Url_MissingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_avatar_public_url_missing(inputs)
	return zh_service_avatar_public_url_missing(inputs)
});