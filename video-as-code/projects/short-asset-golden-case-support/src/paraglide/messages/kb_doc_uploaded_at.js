/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Doc_Uploaded_AtInputs */

const en_kb_doc_uploaded_at = /** @type {(inputs: Kb_Doc_Uploaded_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Uploaded At`)
};

const zh_kb_doc_uploaded_at = /** @type {(inputs: Kb_Doc_Uploaded_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传时间`)
};

/**
* | output |
* | --- |
* | "Uploaded At" |
*
* @param {Kb_Doc_Uploaded_AtInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_doc_uploaded_at = /** @type {((inputs?: Kb_Doc_Uploaded_AtInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Doc_Uploaded_AtInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_doc_uploaded_at(inputs)
	return zh_kb_doc_uploaded_at(inputs)
});