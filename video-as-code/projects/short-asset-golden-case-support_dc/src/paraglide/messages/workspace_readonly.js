/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_ReadonlyInputs */

const en_workspace_readonly = /** @type {(inputs: Workspace_ReadonlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Read only`)
};

const zh_workspace_readonly = /** @type {(inputs: Workspace_ReadonlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`只读`)
};

/**
* | output |
* | --- |
* | "Read only" |
*
* @param {Workspace_ReadonlyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_readonly = /** @type {((inputs?: Workspace_ReadonlyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_ReadonlyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_readonly(inputs)
	return zh_workspace_readonly(inputs)
});