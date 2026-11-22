/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_SavedInputs */

const en_event_settings_saved = /** @type {(inputs: Event_Settings_SavedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event type config has been saved.`)
};

const zh_event_settings_saved = /** @type {(inputs: Event_Settings_SavedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件类型配置已保存。`)
};

/**
* | output |
* | --- |
* | "Event type config has been saved." |
*
* @param {Event_Settings_SavedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_saved = /** @type {((inputs?: Event_Settings_SavedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_SavedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_saved(inputs)
	return zh_event_settings_saved(inputs)
});