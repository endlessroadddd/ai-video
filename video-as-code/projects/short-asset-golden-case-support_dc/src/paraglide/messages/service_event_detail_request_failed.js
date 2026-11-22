/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Event_Detail_Request_FailedInputs */

const en_service_event_detail_request_failed = /** @type {(inputs: Service_Event_Detail_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load event details. Please try again later.`)
};

const zh_service_event_detail_request_failed = /** @type {(inputs: Service_Event_Detail_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任务详情请求失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to load event details. Please try again later." |
*
* @param {Service_Event_Detail_Request_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_event_detail_request_failed = /** @type {((inputs?: Service_Event_Detail_Request_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Event_Detail_Request_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_event_detail_request_failed(inputs)
	return zh_service_event_detail_request_failed(inputs)
});