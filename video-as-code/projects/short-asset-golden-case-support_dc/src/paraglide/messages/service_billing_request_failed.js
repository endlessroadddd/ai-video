/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Billing_Request_FailedInputs */

const en_service_billing_request_failed = /** @type {(inputs: Service_Billing_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Billing request failed. Please try again later.`)
};

const zh_service_billing_request_failed = /** @type {(inputs: Service_Billing_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Billing 请求失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Billing request failed. Please try again later." |
*
* @param {Service_Billing_Request_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_billing_request_failed = /** @type {((inputs?: Service_Billing_Request_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Billing_Request_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_billing_request_failed(inputs)
	return zh_service_billing_request_failed(inputs)
});