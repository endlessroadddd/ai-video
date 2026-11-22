/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Event_Query_FailedInputs */

const en_service_event_query_failed = /** @type {(inputs: Service_Event_Query_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to query events. Please try again later.`)
};

const zh_service_event_query_failed = /** @type {(inputs: Service_Event_Query_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件查询失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to query events. Please try again later." |
*
* @param {Service_Event_Query_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_event_query_failed = /** @type {((inputs?: Service_Event_Query_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Event_Query_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_event_query_failed(inputs)
	return zh_service_event_query_failed(inputs)
});