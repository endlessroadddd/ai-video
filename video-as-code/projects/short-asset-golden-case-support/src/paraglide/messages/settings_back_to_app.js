/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settings_Back_To_AppInputs */

const en_settings_back_to_app = /** @type {(inputs: Settings_Back_To_AppInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back to app`)
};

const zh_settings_back_to_app = /** @type {(inputs: Settings_Back_To_AppInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`返回 app`)
};

/**
* | output |
* | --- |
* | "Back to app" |
*
* @param {Settings_Back_To_AppInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_back_to_app = /** @type {((inputs?: Settings_Back_To_AppInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Back_To_AppInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_settings_back_to_app(inputs)
	return zh_settings_back_to_app(inputs)
});