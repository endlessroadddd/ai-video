/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Confirm_ReplyInputs */

const en_assist_tasks_confirm_reply = /** @type {(inputs: Assist_Tasks_Confirm_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Confirm and Send`)
};

const zh_assist_tasks_confirm_reply = /** @type {(inputs: Assist_Tasks_Confirm_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认并发送`)
};

/**
* | output |
* | --- |
* | "Confirm and Send" |
*
* @param {Assist_Tasks_Confirm_ReplyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_confirm_reply = /** @type {((inputs?: Assist_Tasks_Confirm_ReplyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Confirm_ReplyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_confirm_reply(inputs)
	return zh_assist_tasks_confirm_reply(inputs)
});