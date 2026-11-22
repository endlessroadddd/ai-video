/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Extra_Admins_LabelInputs */

const en_billing_export_extra_admins_label = /** @type {(inputs: Billing_Export_Extra_Admins_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Extra admin seats`)
};

const zh_billing_export_extra_admins_label = /** @type {(inputs: Billing_Export_Extra_Admins_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`额外管理员席位`)
};

/**
* | output |
* | --- |
* | "Extra admin seats" |
*
* @param {Billing_Export_Extra_Admins_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_extra_admins_label = /** @type {((inputs?: Billing_Export_Extra_Admins_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Extra_Admins_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_extra_admins_label(inputs)
	return zh_billing_export_extra_admins_label(inputs)
});