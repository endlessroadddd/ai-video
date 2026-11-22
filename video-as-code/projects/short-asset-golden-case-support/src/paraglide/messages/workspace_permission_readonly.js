/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_Permission_ReadonlyInputs */

const en_workspace_permission_readonly = /** @type {(inputs: Workspace_Permission_ReadonlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current permission: read only`)
};

const zh_workspace_permission_readonly = /** @type {(inputs: Workspace_Permission_ReadonlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前权限：只读`)
};

/**
* | output |
* | --- |
* | "Current permission: read only" |
*
* @param {Workspace_Permission_ReadonlyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_permission_readonly = /** @type {((inputs?: Workspace_Permission_ReadonlyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Permission_ReadonlyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_permission_readonly(inputs)
	return zh_workspace_permission_readonly(inputs)
});