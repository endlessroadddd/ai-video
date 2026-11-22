/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Selected_PrefixInputs */

const en_knowledge_upload_selected_prefix = /** @type {(inputs: Knowledge_Upload_Selected_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Selected: `)
};

const zh_knowledge_upload_selected_prefix = /** @type {(inputs: Knowledge_Upload_Selected_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已选择：`)
};

/**
* | output |
* | --- |
* | "Selected:" |
*
* @param {Knowledge_Upload_Selected_PrefixInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_selected_prefix = /** @type {((inputs?: Knowledge_Upload_Selected_PrefixInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Selected_PrefixInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_selected_prefix(inputs)
	return zh_knowledge_upload_selected_prefix(inputs)
});