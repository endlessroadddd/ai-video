/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settings_Nav_PackageInputs */

const en_settings_nav_package = /** @type {(inputs: Settings_Nav_PackageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plan`)
};

const zh_settings_nav_package = /** @type {(inputs: Settings_Nav_PackageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`套餐`)
};

/**
* | output |
* | --- |
* | "Plan" |
*
* @param {Settings_Nav_PackageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_nav_package = /** @type {((inputs?: Settings_Nav_PackageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Nav_PackageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_settings_nav_package(inputs)
	return zh_settings_nav_package(inputs)
});