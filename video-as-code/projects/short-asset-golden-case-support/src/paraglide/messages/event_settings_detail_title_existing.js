/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Event_Settings_Detail_Title_ExistingInputs */

const en_event_settings_detail_title_existing = /** @type {(inputs: Event_Settings_Detail_Title_ExistingInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} rule details`)
};

const zh_event_settings_detail_title_existing = /** @type {(inputs: Event_Settings_Detail_Title_ExistingInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} 规则详情`)
};

/**
* | output |
* | --- |
* | "{name} rule details" |
*
* @param {Event_Settings_Detail_Title_ExistingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_detail_title_existing = /** @type {((inputs: Event_Settings_Detail_Title_ExistingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Detail_Title_ExistingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_detail_title_existing(inputs)
	return zh_event_settings_detail_title_existing(inputs)
});