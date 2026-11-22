/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ amount: NonNullable<unknown> }} Billing_Monthly_PriceInputs */

const en_billing_monthly_price = /** @type {(inputs: Billing_Monthly_PriceInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.amount} / month`)
};

const zh_billing_monthly_price = /** @type {(inputs: Billing_Monthly_PriceInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.amount} / 月`)
};

/**
* | output |
* | --- |
* | "{amount} / month" |
*
* @param {Billing_Monthly_PriceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_monthly_price = /** @type {((inputs: Billing_Monthly_PriceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Monthly_PriceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_monthly_price(inputs)
	return zh_billing_monthly_price(inputs)
});