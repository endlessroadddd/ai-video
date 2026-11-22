/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_No_Extra_PlatformInputs */

const en_billing_no_extra_platform = /** @type {(inputs: Billing_No_Extra_PlatformInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No extra platforms`)
};

const zh_billing_no_extra_platform = /** @type {(inputs: Billing_No_Extra_PlatformInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无平台加购`)
};

/**
* | output |
* | --- |
* | "No extra platforms" |
*
* @param {Billing_No_Extra_PlatformInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_no_extra_platform = /** @type {((inputs?: Billing_No_Extra_PlatformInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_No_Extra_PlatformInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_no_extra_platform(inputs)
	return zh_billing_no_extra_platform(inputs)
});