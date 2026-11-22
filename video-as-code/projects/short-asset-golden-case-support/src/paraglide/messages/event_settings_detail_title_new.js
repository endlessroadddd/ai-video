/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Detail_Title_NewInputs */

const en_event_settings_detail_title_new = /** @type {(inputs: Event_Settings_Detail_Title_NewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New type rule details`)
};

const zh_event_settings_detail_title_new = /** @type {(inputs: Event_Settings_Detail_Title_NewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新增类型规则详情`)
};

/**
* | output |
* | --- |
* | "New type rule details" |
*
* @param {Event_Settings_Detail_Title_NewInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_detail_title_new = /** @type {((inputs?: Event_Settings_Detail_Title_NewInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Detail_Title_NewInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_detail_title_new(inputs)
	return zh_event_settings_detail_title_new(inputs)
});