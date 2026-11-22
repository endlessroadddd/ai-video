/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Show_Suggested_ReplyInputs */

const en_assist_tasks_show_suggested_reply = /** @type {(inputs: Assist_Tasks_Show_Suggested_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Review Suggestion`)
};

const zh_assist_tasks_show_suggested_reply = /** @type {(inputs: Assist_Tasks_Show_Suggested_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看建议回复`)
};

/**
* | output |
* | --- |
* | "Review Suggestion" |
*
* @param {Assist_Tasks_Show_Suggested_ReplyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_show_suggested_reply = /** @type {((inputs?: Assist_Tasks_Show_Suggested_ReplyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Show_Suggested_ReplyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_show_suggested_reply(inputs)
	return zh_assist_tasks_show_suggested_reply(inputs)
});