/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Select_ResponsibleInputs */

const en_event_settings_select_responsible = /** @type {(inputs: Event_Settings_Select_ResponsibleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select responsible members`)
};

const zh_event_settings_select_responsible = /** @type {(inputs: Event_Settings_Select_ResponsibleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择负责人`)
};

/**
* | output |
* | --- |
* | "Select responsible members" |
*
* @param {Event_Settings_Select_ResponsibleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_select_responsible = /** @type {((inputs?: Event_Settings_Select_ResponsibleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Select_ResponsibleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_select_responsible(inputs)
	return zh_event_settings_select_responsible(inputs)
});