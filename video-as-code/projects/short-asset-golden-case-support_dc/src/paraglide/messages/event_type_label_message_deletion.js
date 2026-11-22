/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Type_Label_Message_DeletionInputs */

const en_event_type_label_message_deletion = /** @type {(inputs: Event_Type_Label_Message_DeletionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message Deletion`)
};

const zh_event_type_label_message_deletion = /** @type {(inputs: Event_Type_Label_Message_DeletionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`消息删除`)
};

/**
* | output |
* | --- |
* | "Message Deletion" |
*
* @param {Event_Type_Label_Message_DeletionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_type_label_message_deletion = /** @type {((inputs?: Event_Type_Label_Message_DeletionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Type_Label_Message_DeletionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_type_label_message_deletion(inputs)
	return zh_event_type_label_message_deletion(inputs)
});