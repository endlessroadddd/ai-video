/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Selected_Files_TitleInputs */

const en_knowledge_upload_selected_files_title = /** @type {(inputs: Knowledge_Upload_Selected_Files_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Selected Files`)
};

const zh_knowledge_upload_selected_files_title = /** @type {(inputs: Knowledge_Upload_Selected_Files_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已选文件`)
};

/**
* | output |
* | --- |
* | "Selected Files" |
*
* @param {Knowledge_Upload_Selected_Files_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_selected_files_title = /** @type {((inputs?: Knowledge_Upload_Selected_Files_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Selected_Files_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_selected_files_title(inputs)
	return zh_knowledge_upload_selected_files_title(inputs)
});