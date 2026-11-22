/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_Navigate_Platform_SettingsInputs */

const en_workspace_navigate_platform_settings = /** @type {(inputs: Workspace_Navigate_Platform_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go to platform settings`)
};

const zh_workspace_navigate_platform_settings = /** @type {(inputs: Workspace_Navigate_Platform_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`前往平台设置`)
};

/**
* | output |
* | --- |
* | "Go to platform settings" |
*
* @param {Workspace_Navigate_Platform_SettingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_navigate_platform_settings = /** @type {((inputs?: Workspace_Navigate_Platform_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Navigate_Platform_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_navigate_platform_settings(inputs)
	return zh_workspace_navigate_platform_settings(inputs)
});