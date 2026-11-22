/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Current_WorkspaceInputs */

const en_billing_current_workspace = /** @type {(inputs: Billing_Current_WorkspaceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current workspace`)
};

const zh_billing_current_workspace = /** @type {(inputs: Billing_Current_WorkspaceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前工作区`)
};

/**
* | output |
* | --- |
* | "Current workspace" |
*
* @param {Billing_Current_WorkspaceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_current_workspace = /** @type {((inputs?: Billing_Current_WorkspaceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Current_WorkspaceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_current_workspace(inputs)
	return zh_billing_current_workspace(inputs)
});