/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Extra_Admins_DescInputs */

const en_billing_export_extra_admins_desc = /** @type {(inputs: Billing_Export_Extra_Admins_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admins beyond the included quota`)
};

const zh_billing_export_extra_admins_desc = /** @type {(inputs: Billing_Export_Extra_Admins_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`超出套餐 included 管理员数`)
};

/**
* | output |
* | --- |
* | "Admins beyond the included quota" |
*
* @param {Billing_Export_Extra_Admins_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_extra_admins_desc = /** @type {((inputs?: Billing_Export_Extra_Admins_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Extra_Admins_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_extra_admins_desc(inputs)
	return zh_billing_export_extra_admins_desc(inputs)
});