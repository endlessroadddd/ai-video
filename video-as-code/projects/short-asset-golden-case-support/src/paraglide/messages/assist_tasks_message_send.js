/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Message_SendInputs */

const en_assist_tasks_message_send = /** @type {(inputs: Assist_Tasks_Message_SendInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send to Lucius`)
};

const zh_assist_tasks_message_send = /** @type {(inputs: Assist_Tasks_Message_SendInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送至Lucius`)
};

/**
* | output |
* | --- |
* | "Send to Lucius" |
*
* @param {Assist_Tasks_Message_SendInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_message_send = /** @type {((inputs?: Assist_Tasks_Message_SendInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Message_SendInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_message_send(inputs)
	return zh_assist_tasks_message_send(inputs)
});