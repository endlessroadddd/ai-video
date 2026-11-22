/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Message_Send_SuccessInputs */

const en_assist_tasks_message_send_success = /** @type {(inputs: Assist_Tasks_Message_Send_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message sent.`)
};

const zh_assist_tasks_message_send_success = /** @type {(inputs: Assist_Tasks_Message_Send_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`消息已发送。`)
};

/**
* | output |
* | --- |
* | "Message sent." |
*
* @param {Assist_Tasks_Message_Send_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_message_send_success = /** @type {((inputs?: Assist_Tasks_Message_Send_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Message_Send_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_message_send_success(inputs)
	return zh_assist_tasks_message_send_success(inputs)
});