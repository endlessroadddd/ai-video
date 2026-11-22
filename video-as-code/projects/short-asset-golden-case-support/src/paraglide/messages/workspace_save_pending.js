/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_Save_PendingInputs */

const en_workspace_save_pending = /** @type {(inputs: Workspace_Save_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saving`)
};

const zh_workspace_save_pending = /** @type {(inputs: Workspace_Save_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存中`)
};

/**
* | output |
* | --- |
* | "Saving" |
*
* @param {Workspace_Save_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_save_pending = /** @type {((inputs?: Workspace_Save_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Save_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_save_pending(inputs)
	return zh_workspace_save_pending(inputs)
});