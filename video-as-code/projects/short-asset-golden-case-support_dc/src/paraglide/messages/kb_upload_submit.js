/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Upload_SubmitInputs */

const en_kb_upload_submit = /** @type {(inputs: Kb_Upload_SubmitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Upload`)
};

const zh_kb_upload_submit = /** @type {(inputs: Kb_Upload_SubmitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传`)
};

/**
* | output |
* | --- |
* | "Upload" |
*
* @param {Kb_Upload_SubmitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_submit = /** @type {((inputs?: Kb_Upload_SubmitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_SubmitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_upload_submit(inputs)
	return zh_kb_upload_submit(inputs)
});