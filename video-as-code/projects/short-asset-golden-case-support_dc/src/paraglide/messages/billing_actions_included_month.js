/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Billing_Actions_Included_MonthInputs */

const en_billing_actions_included_month = /** @type {(inputs: Billing_Actions_Included_MonthInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`/ ${i?.count} included this month`)
};

const zh_billing_actions_included_month = /** @type {(inputs: Billing_Actions_Included_MonthInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`/ ${i?.count} 本月 included`)
};

/**
* | output |
* | --- |
* | "/ {count} included this month" |
*
* @param {Billing_Actions_Included_MonthInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_actions_included_month = /** @type {((inputs: Billing_Actions_Included_MonthInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Actions_Included_MonthInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_actions_included_month(inputs)
	return zh_billing_actions_included_month(inputs)
});