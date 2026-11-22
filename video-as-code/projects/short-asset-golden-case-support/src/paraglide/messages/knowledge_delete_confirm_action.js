/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Delete_Confirm_ActionInputs */

const en_knowledge_delete_confirm_action = /** @type {(inputs: Knowledge_Delete_Confirm_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delete`)
};

const zh_knowledge_delete_confirm_action = /** @type {(inputs: Knowledge_Delete_Confirm_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认删除`)
};

/**
* | output |
* | --- |
* | "Delete" |
*
* @param {Knowledge_Delete_Confirm_ActionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_delete_confirm_action = /** @type {((inputs?: Knowledge_Delete_Confirm_ActionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Delete_Confirm_ActionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_delete_confirm_action(inputs)
	return zh_knowledge_delete_confirm_action(inputs)
});