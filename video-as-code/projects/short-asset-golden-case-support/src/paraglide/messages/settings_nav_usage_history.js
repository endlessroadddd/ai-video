/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settings_Nav_Usage_HistoryInputs */

const en_settings_nav_usage_history = /** @type {(inputs: Settings_Nav_Usage_HistoryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Usage History`)
};

const zh_settings_nav_usage_history = /** @type {(inputs: Settings_Nav_Usage_HistoryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用量历史`)
};

/**
* | output |
* | --- |
* | "Usage History" |
*
* @param {Settings_Nav_Usage_HistoryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_nav_usage_history = /** @type {((inputs?: Settings_Nav_Usage_HistoryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Nav_Usage_HistoryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_settings_nav_usage_history(inputs)
	return zh_settings_nav_usage_history(inputs)
});