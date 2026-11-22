/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Confirming_ReplyInputs */

const en_assist_tasks_confirming_reply = /** @type {(inputs: Assist_Tasks_Confirming_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Confirming...`)
};

const zh_assist_tasks_confirming_reply = /** @type {(inputs: Assist_Tasks_Confirming_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认中...`)
};

/**
* | output |
* | --- |
* | "Confirming..." |
*
* @param {Assist_Tasks_Confirming_ReplyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_confirming_reply = /** @type {((inputs?: Assist_Tasks_Confirming_ReplyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Confirming_ReplyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_confirming_reply(inputs)
	return zh_assist_tasks_confirming_reply(inputs)
});