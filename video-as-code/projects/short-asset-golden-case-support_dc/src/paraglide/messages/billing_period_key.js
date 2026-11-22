/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ key: NonNullable<unknown> }} Billing_Period_KeyInputs */

const en_billing_period_key = /** @type {(inputs: Billing_Period_KeyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Period key: ${i?.key}`)
};

const zh_billing_period_key = /** @type {(inputs: Billing_Period_KeyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`账期 key：${i?.key}`)
};

/**
* | output |
* | --- |
* | "Period key: {key}" |
*
* @param {Billing_Period_KeyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_period_key = /** @type {((inputs: Billing_Period_KeyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Period_KeyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_period_key(inputs)
	return zh_billing_period_key(inputs)
});