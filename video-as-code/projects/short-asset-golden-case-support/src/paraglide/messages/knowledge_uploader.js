/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_UploaderInputs */

const en_knowledge_uploader = /** @type {(inputs: Knowledge_UploaderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Uploader`)
};

const zh_knowledge_uploader = /** @type {(inputs: Knowledge_UploaderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传人`)
};

/**
* | output |
* | --- |
* | "Uploader" |
*
* @param {Knowledge_UploaderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_uploader = /** @type {((inputs?: Knowledge_UploaderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_UploaderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_uploader(inputs)
	return zh_knowledge_uploader(inputs)
});