/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Unbound_AccountsInputs */

const en_event_settings_unbound_accounts = /** @type {(inputs: Event_Settings_Unbound_AccountsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No linked accounts`)
};

const zh_event_settings_unbound_accounts = /** @type {(inputs: Event_Settings_Unbound_AccountsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未绑定账号`)
};

/**
* | output |
* | --- |
* | "No linked accounts" |
*
* @param {Event_Settings_Unbound_AccountsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_unbound_accounts = /** @type {((inputs?: Event_Settings_Unbound_AccountsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Unbound_AccountsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_unbound_accounts(inputs)
	return zh_event_settings_unbound_accounts(inputs)
});