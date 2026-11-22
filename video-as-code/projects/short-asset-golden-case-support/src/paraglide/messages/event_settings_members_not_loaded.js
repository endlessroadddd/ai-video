/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Members_Not_LoadedInputs */

const en_event_settings_members_not_loaded = /** @type {(inputs: Event_Settings_Members_Not_LoadedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Responsible member directory is still loading. Please try saving again later.`)
};

const zh_event_settings_members_not_loaded = /** @type {(inputs: Event_Settings_Members_Not_LoadedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`负责人目录尚未加载完成，请稍后重试保存。`)
};

/**
* | output |
* | --- |
* | "Responsible member directory is still loading. Please try saving again later." |
*
* @param {Event_Settings_Members_Not_LoadedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_members_not_loaded = /** @type {((inputs?: Event_Settings_Members_Not_LoadedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Members_Not_LoadedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_members_not_loaded(inputs)
	return zh_event_settings_members_not_loaded(inputs)
});