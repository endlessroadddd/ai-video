/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_RemoveInputs */

const en_workspace_remove = /** @type {(inputs: Workspace_RemoveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Remove from workgroup`)
};

const zh_workspace_remove = /** @type {(inputs: Workspace_RemoveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`移出工作群`)
};

/**
* | output |
* | --- |
* | "Remove from workgroup" |
*
* @param {Workspace_RemoveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_remove = /** @type {((inputs?: Workspace_RemoveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_RemoveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_remove(inputs)
	return zh_workspace_remove(inputs)
});