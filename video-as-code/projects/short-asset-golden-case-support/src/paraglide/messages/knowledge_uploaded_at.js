/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Uploaded_AtInputs */

const en_knowledge_uploaded_at = /** @type {(inputs: Knowledge_Uploaded_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Uploaded At`)
};

const zh_knowledge_uploaded_at = /** @type {(inputs: Knowledge_Uploaded_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传时间`)
};

/**
* | output |
* | --- |
* | "Uploaded At" |
*
* @param {Knowledge_Uploaded_AtInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_uploaded_at = /** @type {((inputs?: Knowledge_Uploaded_AtInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Uploaded_AtInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_uploaded_at(inputs)
	return zh_knowledge_uploaded_at(inputs)
});