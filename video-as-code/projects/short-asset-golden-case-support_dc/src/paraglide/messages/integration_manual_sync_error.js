/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Integration_Manual_Sync_ErrorInputs */

const en_integration_manual_sync_error = /** @type {(inputs: Integration_Manual_Sync_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manual sync failed.`)
};

const zh_integration_manual_sync_error = /** @type {(inputs: Integration_Manual_Sync_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`手动同步失败。`)
};

/**
* | output |
* | --- |
* | "Manual sync failed." |
*
* @param {Integration_Manual_Sync_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_manual_sync_error = /** @type {((inputs?: Integration_Manual_Sync_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Manual_Sync_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_manual_sync_error(inputs)
	return zh_integration_manual_sync_error(inputs)
});