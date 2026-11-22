/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Upload_Manual_RequiredInputs */

const en_kb_upload_manual_required = /** @type {(inputs: Kb_Upload_Manual_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter content before uploading.`)
};

const zh_kb_upload_manual_required = /** @type {(inputs: Kb_Upload_Manual_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先输入知识内容后再上传。`)
};

/**
* | output |
* | --- |
* | "Please enter content before uploading." |
*
* @param {Kb_Upload_Manual_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_manual_required = /** @type {((inputs?: Kb_Upload_Manual_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Manual_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_upload_manual_required(inputs)
	return zh_kb_upload_manual_required(inputs)
});