/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Type_Message_DeletionInputs */

const en_assist_tasks_type_message_deletion = /** @type {(inputs: Assist_Tasks_Type_Message_DeletionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message Deleted`)
};

const zh_assist_tasks_type_message_deletion = /** @type {(inputs: Assist_Tasks_Type_Message_DeletionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`消息删除`)
};

/**
* | output |
* | --- |
* | "Message Deleted" |
*
* @param {Assist_Tasks_Type_Message_DeletionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_message_deletion = /** @type {((inputs?: Assist_Tasks_Type_Message_DeletionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Message_DeletionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_type_message_deletion(inputs)
	return zh_assist_tasks_type_message_deletion(inputs)
});