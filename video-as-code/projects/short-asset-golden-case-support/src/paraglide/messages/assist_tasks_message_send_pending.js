/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Message_Send_PendingInputs */

const en_assist_tasks_message_send_pending = /** @type {(inputs: Assist_Tasks_Message_Send_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sending...`)
};

const zh_assist_tasks_message_send_pending = /** @type {(inputs: Assist_Tasks_Message_Send_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送中...`)
};

/**
* | output |
* | --- |
* | "Sending..." |
*
* @param {Assist_Tasks_Message_Send_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_message_send_pending = /** @type {((inputs?: Assist_Tasks_Message_Send_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Message_Send_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_message_send_pending(inputs)
	return zh_assist_tasks_message_send_pending(inputs)
});