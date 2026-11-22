/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_SubmitInputs */

const en_knowledge_upload_submit = /** @type {(inputs: Knowledge_Upload_SubmitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Confirm Upload`)
};

const zh_knowledge_upload_submit = /** @type {(inputs: Knowledge_Upload_SubmitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认上传`)
};

/**
* | output |
* | --- |
* | "Confirm Upload" |
*
* @param {Knowledge_Upload_SubmitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_submit = /** @type {((inputs?: Knowledge_Upload_SubmitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_SubmitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_submit(inputs)
	return zh_knowledge_upload_submit(inputs)
});