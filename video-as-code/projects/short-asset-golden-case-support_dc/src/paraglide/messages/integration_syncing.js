/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Integration_SyncingInputs */

const en_integration_syncing = /** @type {(inputs: Integration_SyncingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Syncing...`)
};

const zh_integration_syncing = /** @type {(inputs: Integration_SyncingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`同步中...`)
};

/**
* | output |
* | --- |
* | "Syncing..." |
*
* @param {Integration_SyncingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_syncing = /** @type {((inputs?: Integration_SyncingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_SyncingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_syncing(inputs)
	return zh_integration_syncing(inputs)
});