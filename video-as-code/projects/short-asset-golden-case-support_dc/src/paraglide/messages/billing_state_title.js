/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_State_TitleInputs */

const en_billing_state_title = /** @type {(inputs: Billing_State_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current status`)
};

const zh_billing_state_title = /** @type {(inputs: Billing_State_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前状态`)
};

/**
* | output |
* | --- |
* | "Current status" |
*
* @param {Billing_State_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_state_title = /** @type {((inputs?: Billing_State_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_State_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_state_title(inputs)
	return zh_billing_state_title(inputs)
});