/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_State_Needs_ConnectionInputs */

const en_workspace_state_needs_connection = /** @type {(inputs: Workspace_State_Needs_ConnectionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Needs connection`)
};

const zh_workspace_state_needs_connection = /** @type {(inputs: Workspace_State_Needs_ConnectionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待关联`)
};

/**
* | output |
* | --- |
* | "Needs connection" |
*
* @param {Workspace_State_Needs_ConnectionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_state_needs_connection = /** @type {((inputs?: Workspace_State_Needs_ConnectionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_State_Needs_ConnectionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_state_needs_connection(inputs)
	return zh_workspace_state_needs_connection(inputs)
});