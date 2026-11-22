/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Message_Input_PlaceholderInputs */

const en_assist_tasks_message_input_placeholder = /** @type {(inputs: Assist_Tasks_Message_Input_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`How should Lucius reply to the user?`)
};

const zh_assist_tasks_message_input_placeholder = /** @type {(inputs: Assist_Tasks_Message_Input_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius要如何回复用户？`)
};

/**
* | output |
* | --- |
* | "How should Lucius reply to the user?" |
*
* @param {Assist_Tasks_Message_Input_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_message_input_placeholder = /** @type {((inputs?: Assist_Tasks_Message_Input_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Message_Input_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_message_input_placeholder(inputs)
	return zh_assist_tasks_message_input_placeholder(inputs)
});