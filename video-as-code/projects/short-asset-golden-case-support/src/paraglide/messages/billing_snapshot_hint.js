/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Snapshot_HintInputs */

const en_billing_snapshot_hint = /** @type {(inputs: Billing_Snapshot_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`For internal verification only. This does not replace the official Stripe invoice.`)
};

const zh_billing_snapshot_hint = /** @type {(inputs: Billing_Snapshot_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`内部核对用，不替代 Stripe 官方 invoice`)
};

/**
* | output |
* | --- |
* | "For internal verification only. This does not replace the official Stripe invoice." |
*
* @param {Billing_Snapshot_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_snapshot_hint = /** @type {((inputs?: Billing_Snapshot_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Snapshot_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_snapshot_hint(inputs)
	return zh_billing_snapshot_hint(inputs)
});