/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Workspace_Remove_SuccessInputs */

const en_workspace_remove_success = /** @type {(inputs: Workspace_Remove_SuccessInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} was removed from workgroups.`)
};

const zh_workspace_remove_success = /** @type {(inputs: Workspace_Remove_SuccessInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} 已移出工作群。`)
};

/**
* | output |
* | --- |
* | "{name} was removed from workgroups." |
*
* @param {Workspace_Remove_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_remove_success = /** @type {((inputs: Workspace_Remove_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Remove_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_remove_success(inputs)
	return zh_workspace_remove_success(inputs)
});