/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Missing_Saved_Config_IdInputs */

const en_event_settings_missing_saved_config_id = /** @type {(inputs: Event_Settings_Missing_Saved_Config_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A valid config ID was not returned after saving. Please refresh and try again.`)
};

const zh_event_settings_missing_saved_config_id = /** @type {(inputs: Event_Settings_Missing_Saved_Config_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存事件类型后未获取到有效配置 ID，请刷新重试。`)
};

/**
* | output |
* | --- |
* | "A valid config ID was not returned after saving. Please refresh and try again." |
*
* @param {Event_Settings_Missing_Saved_Config_IdInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_missing_saved_config_id = /** @type {((inputs?: Event_Settings_Missing_Saved_Config_IdInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Missing_Saved_Config_IdInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_missing_saved_config_id(inputs)
	return zh_event_settings_missing_saved_config_id(inputs)
});