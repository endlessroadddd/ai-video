/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Message_Send_ErrorInputs */

const en_assist_tasks_message_send_error = /** @type {(inputs: Assist_Tasks_Message_Send_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to send the message. Please try again later.`)
};

const zh_assist_tasks_message_send_error = /** @type {(inputs: Assist_Tasks_Message_Send_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送消息失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to send the message. Please try again later." |
*
* @param {Assist_Tasks_Message_Send_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_message_send_error = /** @type {((inputs?: Assist_Tasks_Message_Send_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Message_Send_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_message_send_error(inputs)
	return zh_assist_tasks_message_send_error(inputs)
});