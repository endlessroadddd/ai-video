/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Label_ResponsibleInputs */

const en_event_settings_label_responsible = /** @type {(inputs: Event_Settings_Label_ResponsibleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Responsible members (multi-select)`)
};

const zh_event_settings_label_responsible = /** @type {(inputs: Event_Settings_Label_ResponsibleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`负责人（多选）`)
};

/**
* | output |
* | --- |
* | "Responsible members (multi-select)" |
*
* @param {Event_Settings_Label_ResponsibleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_label_responsible = /** @type {((inputs?: Event_Settings_Label_ResponsibleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Label_ResponsibleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_label_responsible(inputs)
	return zh_event_settings_label_responsible(inputs)
});