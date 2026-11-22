/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Billing_Extra_AdminInputs */

const en_billing_extra_admin = /** @type {(inputs: Billing_Extra_AdminInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Extra admins ${i?.count}`)
};

const zh_billing_extra_admin = /** @type {(inputs: Billing_Extra_AdminInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`管理员加购 ${i?.count}`)
};

/**
* | output |
* | --- |
* | "Extra admins {count}" |
*
* @param {Billing_Extra_AdminInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_extra_admin = /** @type {((inputs: Billing_Extra_AdminInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Extra_AdminInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_extra_admin(inputs)
	return zh_billing_extra_admin(inputs)
});