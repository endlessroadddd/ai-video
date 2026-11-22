/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_Save_ErrorInputs */

const en_workspace_save_error = /** @type {(inputs: Workspace_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to save workgroup settings. Please try again later.`)
};

const zh_workspace_save_error = /** @type {(inputs: Workspace_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存工作群设置失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to save workgroup settings. Please try again later." |
*
* @param {Workspace_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_save_error = /** @type {((inputs?: Workspace_Save_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Save_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_save_error(inputs)
	return zh_workspace_save_error(inputs)
});