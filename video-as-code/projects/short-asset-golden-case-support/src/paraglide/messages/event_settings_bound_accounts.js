/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ accounts: NonNullable<unknown> }} Event_Settings_Bound_AccountsInputs */

const en_event_settings_bound_accounts = /** @type {(inputs: Event_Settings_Bound_AccountsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Linked: ${i?.accounts}`)
};

const zh_event_settings_bound_accounts = /** @type {(inputs: Event_Settings_Bound_AccountsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已绑定：${i?.accounts}`)
};

/**
* | output |
* | --- |
* | "Linked: {accounts}" |
*
* @param {Event_Settings_Bound_AccountsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_bound_accounts = /** @type {((inputs: Event_Settings_Bound_AccountsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Bound_AccountsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_bound_accounts(inputs)
	return zh_event_settings_bound_accounts(inputs)
});