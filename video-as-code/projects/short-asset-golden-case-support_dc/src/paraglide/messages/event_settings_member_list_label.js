/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Member_List_LabelInputs */

const en_event_settings_member_list_label = /** @type {(inputs: Event_Settings_Member_List_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Organization members (by email)`)
};

const zh_event_settings_member_list_label = /** @type {(inputs: Event_Settings_Member_List_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`组织成员（按邮箱）`)
};

/**
* | output |
* | --- |
* | "Organization members (by email)" |
*
* @param {Event_Settings_Member_List_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_member_list_label = /** @type {((inputs?: Event_Settings_Member_List_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Member_List_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_member_list_label(inputs)
	return zh_event_settings_member_list_label(inputs)
});