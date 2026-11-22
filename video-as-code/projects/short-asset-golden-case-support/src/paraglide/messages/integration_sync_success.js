/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Integration_Sync_SuccessInputs */

const en_integration_sync_success = /** @type {(inputs: Integration_Sync_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manual sync completed.`)
};

const zh_integration_sync_success = /** @type {(inputs: Integration_Sync_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`手动同步成功。`)
};

/**
* | output |
* | --- |
* | "Manual sync completed." |
*
* @param {Integration_Sync_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_sync_success = /** @type {((inputs?: Integration_Sync_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Sync_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_sync_success(inputs)
	return zh_integration_sync_success(inputs)
});