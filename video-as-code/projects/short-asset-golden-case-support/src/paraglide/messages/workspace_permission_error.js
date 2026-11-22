/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_Permission_ErrorInputs */

const en_workspace_permission_error = /** @type {(inputs: Workspace_Permission_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only Owner/Admin can modify workgroup settings.`)
};

const zh_workspace_permission_error = /** @type {(inputs: Workspace_Permission_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`仅 Owner/Admin 可修改工作群设置。`)
};

/**
* | output |
* | --- |
* | "Only Owner/Admin can modify workgroup settings." |
*
* @param {Workspace_Permission_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_permission_error = /** @type {((inputs?: Workspace_Permission_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Permission_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_permission_error(inputs)
	return zh_workspace_permission_error(inputs)
});