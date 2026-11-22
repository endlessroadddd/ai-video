/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Billing_Extra_PlatformInputs */

const en_billing_extra_platform = /** @type {(inputs: Billing_Extra_PlatformInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Extra platforms ${i?.count}`)
};

const zh_billing_extra_platform = /** @type {(inputs: Billing_Extra_PlatformInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`平台加购 ${i?.count}`)
};

/**
* | output |
* | --- |
* | "Extra platforms {count}" |
*
* @param {Billing_Extra_PlatformInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_extra_platform = /** @type {((inputs: Billing_Extra_PlatformInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Extra_PlatformInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_extra_platform(inputs)
	return zh_billing_extra_platform(inputs)
});