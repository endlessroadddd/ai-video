/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_UploadInputs */

const en_kb_upload = /** @type {(inputs: Kb_UploadInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Upload`)
};

const zh_kb_upload = /** @type {(inputs: Kb_UploadInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传知识`)
};

/**
* | output |
* | --- |
* | "Upload" |
*
* @param {Kb_UploadInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload = /** @type {((inputs?: Kb_UploadInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_UploadInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_upload(inputs)
	return zh_kb_upload(inputs)
});