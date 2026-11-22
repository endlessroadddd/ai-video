/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Event_Query_Empty_ContentInputs */

const en_service_event_query_empty_content = /** @type {(inputs: Service_Event_Query_Empty_ContentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`[No text content]`)
};

const zh_service_event_query_empty_content = /** @type {(inputs: Service_Event_Query_Empty_ContentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`[无文本内容]`)
};

/**
* | output |
* | --- |
* | "[No text content]" |
*
* @param {Service_Event_Query_Empty_ContentInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_event_query_empty_content = /** @type {((inputs?: Service_Event_Query_Empty_ContentInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Event_Query_Empty_ContentInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_event_query_empty_content(inputs)
	return zh_service_event_query_empty_content(inputs)
});