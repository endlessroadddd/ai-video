/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Integration_Manual_SyncInputs */

const en_integration_manual_sync = /** @type {(inputs: Integration_Manual_SyncInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manual sync`)
};

const zh_integration_manual_sync = /** @type {(inputs: Integration_Manual_SyncInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`手动同步`)
};

/**
* | output |
* | --- |
* | "Manual sync" |
*
* @param {Integration_Manual_SyncInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_manual_sync = /** @type {((inputs?: Integration_Manual_SyncInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Manual_SyncInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_manual_sync(inputs)
	return zh_integration_manual_sync(inputs)
});