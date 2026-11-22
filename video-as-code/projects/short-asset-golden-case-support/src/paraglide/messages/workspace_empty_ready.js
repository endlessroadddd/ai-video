/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_Empty_ReadyInputs */

const en_workspace_empty_ready = /** @type {(inputs: Workspace_Empty_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No available channels on this platform yet.`)
};

const zh_workspace_empty_ready = /** @type {(inputs: Workspace_Empty_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前平台暂无可选频道。`)
};

/**
* | output |
* | --- |
* | "No available channels on this platform yet." |
*
* @param {Workspace_Empty_ReadyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_empty_ready = /** @type {((inputs?: Workspace_Empty_ReadyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Empty_ReadyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_empty_ready(inputs)
	return zh_workspace_empty_ready(inputs)
});