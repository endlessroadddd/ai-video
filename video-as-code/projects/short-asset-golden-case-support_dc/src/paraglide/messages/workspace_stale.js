/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_StaleInputs */

const en_workspace_stale = /** @type {(inputs: Workspace_StaleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disconnected`)
};

const zh_workspace_stale = /** @type {(inputs: Workspace_StaleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已失联`)
};

/**
* | output |
* | --- |
* | "Disconnected" |
*
* @param {Workspace_StaleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_stale = /** @type {((inputs?: Workspace_StaleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_StaleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_stale(inputs)
	return zh_workspace_stale(inputs)
});