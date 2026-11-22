/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Download_ReceiptInputs */

const en_billing_download_receipt = /** @type {(inputs: Billing_Download_ReceiptInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Download receipt`)
};

const zh_billing_download_receipt = /** @type {(inputs: Billing_Download_ReceiptInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下载收据`)
};

/**
* | output |
* | --- |
* | "Download receipt" |
*
* @param {Billing_Download_ReceiptInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_download_receipt = /** @type {((inputs?: Billing_Download_ReceiptInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Download_ReceiptInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_download_receipt(inputs)
	return zh_billing_download_receipt(inputs)
});