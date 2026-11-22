/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ platform: NonNullable<unknown>, admin: NonNullable<unknown> }} Billing_Addon_SummaryInputs */

const en_billing_addon_summary = /** @type {(inputs: Billing_Addon_SummaryInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Platform add-on ${i?.platform} / month · Admin add-on ${i?.admin} / month`)
};

const zh_billing_addon_summary = /** @type {(inputs: Billing_Addon_SummaryInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`平台加购 ${i?.platform} / 月 · 管理员加购 ${i?.admin} / 月`)
};

/**
* | output |
* | --- |
* | "Platform add-on {platform} / month · Admin add-on {admin} / month" |
*
* @param {Billing_Addon_SummaryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_addon_summary = /** @type {((inputs: Billing_Addon_SummaryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Addon_SummaryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_addon_summary(inputs)
	return zh_billing_addon_summary(inputs)
});