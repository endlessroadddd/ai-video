/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_Settings_TitleInputs */

const en_workspace_settings_title = /** @type {(inputs: Workspace_Settings_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workgroup Settings`)
};

const zh_workspace_settings_title = /** @type {(inputs: Workspace_Settings_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作群设置`)
};

/**
* | output |
* | --- |
* | "Workgroup Settings" |
*
* @param {Workspace_Settings_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_settings_title = /** @type {((inputs?: Workspace_Settings_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Settings_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_settings_title(inputs)
	return zh_workspace_settings_title(inputs)
});