/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_TitleInputs */

const en_event_settings_title = /** @type {(inputs: Event_Settings_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event Settings`)
};

const zh_event_settings_title = /** @type {(inputs: Event_Settings_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件配置`)
};

/**
* | output |
* | --- |
* | "Event Settings" |
*
* @param {Event_Settings_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_title = /** @type {((inputs?: Event_Settings_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_title(inputs)
	return zh_event_settings_title(inputs)
});