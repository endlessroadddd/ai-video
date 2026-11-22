/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Kb_Upload_Doc_SelectedInputs */

const en_kb_upload_doc_selected = /** @type {(inputs: Kb_Upload_Doc_SelectedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Selected: ${i?.name}`)
};

const zh_kb_upload_doc_selected = /** @type {(inputs: Kb_Upload_Doc_SelectedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已选择：${i?.name}`)
};

/**
* | output |
* | --- |
* | "Selected: {name}" |
*
* @param {Kb_Upload_Doc_SelectedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_selected = /** @type {((inputs: Kb_Upload_Doc_SelectedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_SelectedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_upload_doc_selected(inputs)
	return zh_kb_upload_doc_selected(inputs)
});