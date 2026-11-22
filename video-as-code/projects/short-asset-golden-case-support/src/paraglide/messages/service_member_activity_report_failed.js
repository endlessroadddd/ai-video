/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Member_Activity_Report_FailedInputs */

const en_service_member_activity_report_failed = /** @type {(inputs: Service_Member_Activity_Report_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to report member activity. Please try again later.`)
};

const zh_service_member_activity_report_failed = /** @type {(inputs: Service_Member_Activity_Report_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`成员活跃时间上报失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to report member activity. Please try again later." |
*
* @param {Service_Member_Activity_Report_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_member_activity_report_failed = /** @type {((inputs?: Service_Member_Activity_Report_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Member_Activity_Report_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_member_activity_report_failed(inputs)
	return zh_service_member_activity_report_failed(inputs)
});