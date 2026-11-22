/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} App_TitleInputs */

const en_app_title = /** @type {(inputs: App_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius AI`)
};

const zh_app_title = /** @type {(inputs: App_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius AI`)
};

/**
* | output |
* | --- |
* | "Lucius AI" |
*
* @param {App_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const app_title = /** @type {((inputs?: App_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<App_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_app_title(inputs)
	return zh_app_title(inputs)
});