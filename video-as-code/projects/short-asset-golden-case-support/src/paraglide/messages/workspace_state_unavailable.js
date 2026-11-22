/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_State_UnavailableInputs */

const en_workspace_state_unavailable = /** @type {(inputs: Workspace_State_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unavailable`)
};

const zh_workspace_state_unavailable = /** @type {(inputs: Workspace_State_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未开放`)
};

/**
* | output |
* | --- |
* | "Unavailable" |
*
* @param {Workspace_State_UnavailableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_state_unavailable = /** @type {((inputs?: Workspace_State_UnavailableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_State_UnavailableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_state_unavailable(inputs)
	return zh_workspace_state_unavailable(inputs)
});