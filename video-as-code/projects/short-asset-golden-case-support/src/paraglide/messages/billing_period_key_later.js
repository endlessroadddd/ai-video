/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Period_Key_LaterInputs */

const en_billing_period_key_later = /** @type {(inputs: Billing_Period_Key_LaterInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The period key will appear on the detailed ledger page later.`)
};

const zh_billing_period_key_later = /** @type {(inputs: Billing_Period_Key_LaterInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`账期 key 将在后续账本明细页展示`)
};

/**
* | output |
* | --- |
* | "The period key will appear on the detailed ledger page later." |
*
* @param {Billing_Period_Key_LaterInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_period_key_later = /** @type {((inputs?: Billing_Period_Key_LaterInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Period_Key_LaterInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_period_key_later(inputs)
	return zh_billing_period_key_later(inputs)
});