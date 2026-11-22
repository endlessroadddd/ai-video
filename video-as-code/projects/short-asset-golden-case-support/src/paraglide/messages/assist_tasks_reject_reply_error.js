/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Reject_Reply_ErrorInputs */

const en_assist_tasks_reject_reply_error = /** @type {(inputs: Assist_Tasks_Reject_Reply_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to dismiss the suggested reply. Please try again later.`)
};

const zh_assist_tasks_reject_reply_error = /** @type {(inputs: Assist_Tasks_Reject_Reply_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取消采用失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to dismiss the suggested reply. Please try again later." |
*
* @param {Assist_Tasks_Reject_Reply_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_reject_reply_error = /** @type {((inputs?: Assist_Tasks_Reject_Reply_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Reject_Reply_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_reject_reply_error(inputs)
	return zh_assist_tasks_reject_reply_error(inputs)
});