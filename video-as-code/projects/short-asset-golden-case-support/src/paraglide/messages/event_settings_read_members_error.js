/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Read_Members_ErrorInputs */

const en_event_settings_read_members_error = /** @type {(inputs: Event_Settings_Read_Members_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to read organization members.`)
};

const zh_event_settings_read_members_error = /** @type {(inputs: Event_Settings_Read_Members_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取组织成员失败。`)
};

/**
* | output |
* | --- |
* | "Failed to read organization members." |
*
* @param {Event_Settings_Read_Members_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_read_members_error = /** @type {((inputs?: Event_Settings_Read_Members_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Read_Members_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_read_members_error(inputs)
	return zh_event_settings_read_members_error(inputs)
});