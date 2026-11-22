/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_SetInputs */

const en_workspace_set = /** @type {(inputs: Workspace_SetInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set as workgroup`)
};

const zh_workspace_set = /** @type {(inputs: Workspace_SetInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`设为工作群`)
};

/**
* | output |
* | --- |
* | "Set as workgroup" |
*
* @param {Workspace_SetInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_set = /** @type {((inputs?: Workspace_SetInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_SetInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_set(inputs)
	return zh_workspace_set(inputs)
});