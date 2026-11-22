/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_Empty_UnavailableInputs */

const en_workspace_empty_unavailable = /** @type {(inputs: Workspace_Empty_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workgroup settings are not available for this platform yet.`)
};

const zh_workspace_empty_unavailable = /** @type {(inputs: Workspace_Empty_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`该平台的工作群设置暂不可用。`)
};

/**
* | output |
* | --- |
* | "Workgroup settings are not available for this platform yet." |
*
* @param {Workspace_Empty_UnavailableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_empty_unavailable = /** @type {((inputs?: Workspace_Empty_UnavailableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Empty_UnavailableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_empty_unavailable(inputs)
	return zh_workspace_empty_unavailable(inputs)
});