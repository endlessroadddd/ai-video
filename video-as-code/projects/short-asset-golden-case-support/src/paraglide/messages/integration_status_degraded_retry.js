/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Integration_Status_Degraded_RetryInputs */

const en_integration_status_degraded_retry = /** @type {(inputs: Integration_Status_Degraded_RetryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Degraded (retry available)`)
};

const zh_integration_status_degraded_retry = /** @type {(inputs: Integration_Status_Degraded_RetryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`降级（可重试）`)
};

/**
* | output |
* | --- |
* | "Degraded (retry available)" |
*
* @param {Integration_Status_Degraded_RetryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_status_degraded_retry = /** @type {((inputs?: Integration_Status_Degraded_RetryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Status_Degraded_RetryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_status_degraded_retry(inputs)
	return zh_integration_status_degraded_retry(inputs)
});