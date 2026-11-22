/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_Permission_EditableInputs */

const en_workspace_permission_editable = /** @type {(inputs: Workspace_Permission_EditableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current permission: editable`)
};

const zh_workspace_permission_editable = /** @type {(inputs: Workspace_Permission_EditableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前权限：可编辑`)
};

/**
* | output |
* | --- |
* | "Current permission: editable" |
*
* @param {Workspace_Permission_EditableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_permission_editable = /** @type {((inputs?: Workspace_Permission_EditableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Permission_EditableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_permission_editable(inputs)
	return zh_workspace_permission_editable(inputs)
});