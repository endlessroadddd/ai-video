/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ message: NonNullable<unknown> }} Assist_Tasks_Messages_Load_ErrorInputs */

const en_assist_tasks_messages_load_error = /** @type {(inputs: Assist_Tasks_Messages_Load_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Failed to load messages: ${i?.message}`)
};

const zh_assist_tasks_messages_load_error = /** @type {(inputs: Assist_Tasks_Messages_Load_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`消息加载失败：${i?.message}`)
};

/**
* | output |
* | --- |
* | "Failed to load messages: {message}" |
*
* @param {Assist_Tasks_Messages_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_messages_load_error = /** @type {((inputs: Assist_Tasks_Messages_Load_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Messages_Load_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_messages_load_error(inputs)
	return zh_assist_tasks_messages_load_error(inputs)
});