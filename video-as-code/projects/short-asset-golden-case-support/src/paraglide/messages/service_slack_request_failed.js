/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Slack_Request_FailedInputs */

const en_service_slack_request_failed = /** @type {(inputs: Service_Slack_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slack integration request failed.`)
};

const zh_service_slack_request_failed = /** @type {(inputs: Service_Slack_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slack 集成请求失败。`)
};

/**
* | output |
* | --- |
* | "Slack integration request failed." |
*
* @param {Service_Slack_Request_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_slack_request_failed = /** @type {((inputs?: Service_Slack_Request_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Slack_Request_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_slack_request_failed(inputs)
	return zh_service_slack_request_failed(inputs)
});