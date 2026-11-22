/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Header_Action_FilesInputs */

const en_header_action_files = /** @type {(inputs: Header_Action_FilesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Files`)
};

const zh_header_action_files = /** @type {(inputs: Header_Action_FilesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文件`)
};

/**
* | output |
* | --- |
* | "Files" |
*
* @param {Header_Action_FilesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_action_files = /** @type {((inputs?: Header_Action_FilesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_Action_FilesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_header_action_files(inputs)
	return zh_header_action_files(inputs)
});