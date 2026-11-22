/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_No_MessagesInputs */

const en_assist_tasks_no_messages = /** @type {(inputs: Assist_Tasks_No_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`There is no message content to display for this event.`)
};

const zh_assist_tasks_no_messages = /** @type {(inputs: Assist_Tasks_No_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前事件暂无可展示的消息内容。`)
};

/**
* | output |
* | --- |
* | "There is no message content to display for this event." |
*
* @param {Assist_Tasks_No_MessagesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_no_messages = /** @type {((inputs?: Assist_Tasks_No_MessagesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_No_MessagesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_no_messages(inputs)
	return zh_assist_tasks_no_messages(inputs)
});