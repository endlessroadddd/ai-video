/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Integration_Status_DisabledInputs */

const en_integration_status_disabled = /** @type {(inputs: Integration_Status_DisabledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disabled`)
};

const zh_integration_status_disabled = /** @type {(inputs: Integration_Status_DisabledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已禁用`)
};

/**
* | output |
* | --- |
* | "Disabled" |
*
* @param {Integration_Status_DisabledInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_status_disabled = /** @type {((inputs?: Integration_Status_DisabledInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Status_DisabledInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_status_disabled(inputs)
	return zh_integration_status_disabled(inputs)
});