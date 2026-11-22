/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_State_ReadyInputs */

const en_workspace_state_ready = /** @type {(inputs: Workspace_State_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configurable`)
};

const zh_workspace_state_ready = /** @type {(inputs: Workspace_State_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可配置`)
};

/**
* | output |
* | --- |
* | "Configurable" |
*
* @param {Workspace_State_ReadyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_state_ready = /** @type {((inputs?: Workspace_State_ReadyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_State_ReadyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_state_ready(inputs)
	return zh_workspace_state_ready(inputs)
});