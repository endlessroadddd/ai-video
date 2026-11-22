/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Upload_Doc_ClickInputs */

const en_kb_upload_doc_click = /** @type {(inputs: Kb_Upload_Doc_ClickInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Click to upload`)
};

const zh_kb_upload_doc_click = /** @type {(inputs: Kb_Upload_Doc_ClickInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`点击上传`)
};

/**
* | output |
* | --- |
* | "Click to upload" |
*
* @param {Kb_Upload_Doc_ClickInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_click = /** @type {((inputs?: Kb_Upload_Doc_ClickInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_ClickInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_upload_doc_click(inputs)
	return zh_kb_upload_doc_click(inputs)
});