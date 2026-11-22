/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Workspace_Add_SuccessInputs */

const en_workspace_add_success = /** @type {(inputs: Workspace_Add_SuccessInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} was set as a workgroup.`)
};

const zh_workspace_add_success = /** @type {(inputs: Workspace_Add_SuccessInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} 已设为工作群。`)
};

/**
* | output |
* | --- |
* | "{name} was set as a workgroup." |
*
* @param {Workspace_Add_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_add_success = /** @type {((inputs: Workspace_Add_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Add_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_add_success(inputs)
	return zh_workspace_add_success(inputs)
});