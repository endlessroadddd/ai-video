/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Doc_UploaderInputs */

const en_kb_doc_uploader = /** @type {(inputs: Kb_Doc_UploaderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Uploader`)
};

const zh_kb_doc_uploader = /** @type {(inputs: Kb_Doc_UploaderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传人`)
};

/**
* | output |
* | --- |
* | "Uploader" |
*
* @param {Kb_Doc_UploaderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_doc_uploader = /** @type {((inputs?: Kb_Doc_UploaderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Doc_UploaderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_doc_uploader(inputs)
	return zh_kb_doc_uploader(inputs)
});