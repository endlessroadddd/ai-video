/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_List_EmptyInputs */

const en_event_settings_list_empty = /** @type {(inputs: Event_Settings_List_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This company does not have any event types yet.`)
};

const zh_event_settings_list_empty = /** @type {(inputs: Event_Settings_List_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前公司暂无事件类型。`)
};

/**
* | output |
* | --- |
* | "This company does not have any event types yet." |
*
* @param {Event_Settings_List_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_list_empty = /** @type {((inputs?: Event_Settings_List_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_List_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_list_empty(inputs)
	return zh_event_settings_list_empty(inputs)
});