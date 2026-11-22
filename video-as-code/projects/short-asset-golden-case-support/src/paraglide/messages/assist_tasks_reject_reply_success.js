/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Reject_Reply_SuccessInputs */

const en_assist_tasks_reject_reply_success = /** @type {(inputs: Assist_Tasks_Reject_Reply_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Suggested reply dismissed.`)
};

const zh_assist_tasks_reject_reply_success = /** @type {(inputs: Assist_Tasks_Reject_Reply_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建议回复已取消采用。`)
};

/**
* | output |
* | --- |
* | "Suggested reply dismissed." |
*
* @param {Assist_Tasks_Reject_Reply_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_reject_reply_success = /** @type {((inputs?: Assist_Tasks_Reject_Reply_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Reject_Reply_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_reject_reply_success(inputs)
	return zh_assist_tasks_reject_reply_success(inputs)
});