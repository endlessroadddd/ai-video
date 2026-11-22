/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_No_Extra_AdminInputs */

const en_billing_no_extra_admin = /** @type {(inputs: Billing_No_Extra_AdminInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No extra admins`)
};

const zh_billing_no_extra_admin = /** @type {(inputs: Billing_No_Extra_AdminInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无管理员加购`)
};

/**
* | output |
* | --- |
* | "No extra admins" |
*
* @param {Billing_No_Extra_AdminInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_no_extra_admin = /** @type {((inputs?: Billing_No_Extra_AdminInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_No_Extra_AdminInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_no_extra_admin(inputs)
	return zh_billing_no_extra_admin(inputs)
});