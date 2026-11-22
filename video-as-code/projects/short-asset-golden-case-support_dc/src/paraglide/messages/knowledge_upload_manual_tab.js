/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Manual_TabInputs */

const en_knowledge_upload_manual_tab = /** @type {(inputs: Knowledge_Upload_Manual_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manual`)
};

const zh_knowledge_upload_manual_tab = /** @type {(inputs: Knowledge_Upload_Manual_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`手动添加`)
};

/**
* | output |
* | --- |
* | "Manual" |
*
* @param {Knowledge_Upload_Manual_TabInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_manual_tab = /** @type {((inputs?: Knowledge_Upload_Manual_TabInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Manual_TabInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_manual_tab(inputs)
	return zh_knowledge_upload_manual_tab(inputs)
});