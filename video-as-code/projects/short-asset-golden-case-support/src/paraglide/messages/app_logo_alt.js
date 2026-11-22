/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} App_Logo_AltInputs */

const en_app_logo_alt = /** @type {(inputs: App_Logo_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius logo`)
};

const zh_app_logo_alt = /** @type {(inputs: App_Logo_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius 标识`)
};

/**
* | output |
* | --- |
* | "Lucius logo" |
*
* @param {App_Logo_AltInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const app_logo_alt = /** @type {((inputs?: App_Logo_AltInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<App_Logo_AltInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_app_logo_alt(inputs)
	return zh_app_logo_alt(inputs)
});