/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Trigger_Owner_UnboundInputs */

const en_event_settings_trigger_owner_unbound = /** @type {(inputs: Event_Settings_Trigger_Owner_UnboundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Responsible members have no linked accounts`)
};

const zh_event_settings_trigger_owner_unbound = /** @type {(inputs: Event_Settings_Trigger_Owner_UnboundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`负责人未绑定账号`)
};

/**
* | output |
* | --- |
* | "Responsible members have no linked accounts" |
*
* @param {Event_Settings_Trigger_Owner_UnboundInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_trigger_owner_unbound = /** @type {((inputs?: Event_Settings_Trigger_Owner_UnboundInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Trigger_Owner_UnboundInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_trigger_owner_unbound(inputs)
	return zh_event_settings_trigger_owner_unbound(inputs)
});