/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Used_Actions_TitleInputs */

const en_billing_used_actions_title = /** @type {(inputs: Billing_Used_Actions_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actions used this month`)
};

const zh_billing_used_actions_title = /** @type {(inputs: Billing_Used_Actions_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`本月已用 actions`)
};

/**
* | output |
* | --- |
* | "Actions used this month" |
*
* @param {Billing_Used_Actions_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_used_actions_title = /** @type {((inputs?: Billing_Used_Actions_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Used_Actions_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_used_actions_title(inputs)
	return zh_billing_used_actions_title(inputs)
});