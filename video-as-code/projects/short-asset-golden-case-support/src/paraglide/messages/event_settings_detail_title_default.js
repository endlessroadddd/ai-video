/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Detail_Title_DefaultInputs */

const en_event_settings_detail_title_default = /** @type {(inputs: Event_Settings_Detail_Title_DefaultInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rule details`)
};

const zh_event_settings_detail_title_default = /** @type {(inputs: Event_Settings_Detail_Title_DefaultInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`规则详情`)
};

/**
* | output |
* | --- |
* | "Rule details" |
*
* @param {Event_Settings_Detail_Title_DefaultInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_detail_title_default = /** @type {((inputs?: Event_Settings_Detail_Title_DefaultInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Detail_Title_DefaultInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_detail_title_default(inputs)
	return zh_event_settings_detail_title_default(inputs)
});