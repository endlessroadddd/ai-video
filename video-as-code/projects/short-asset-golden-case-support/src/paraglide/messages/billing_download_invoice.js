/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Download_InvoiceInputs */

const en_billing_download_invoice = /** @type {(inputs: Billing_Download_InvoiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Download invoice`)
};

const zh_billing_download_invoice = /** @type {(inputs: Billing_Download_InvoiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下载账单`)
};

/**
* | output |
* | --- |
* | "Download invoice" |
*
* @param {Billing_Download_InvoiceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_download_invoice = /** @type {((inputs?: Billing_Download_InvoiceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Download_InvoiceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_download_invoice(inputs)
	return zh_billing_download_invoice(inputs)
});