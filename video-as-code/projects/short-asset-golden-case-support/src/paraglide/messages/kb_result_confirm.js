/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Result_ConfirmInputs */

const en_kb_result_confirm = /** @type {(inputs: Kb_Result_ConfirmInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Confirm`)
};

const zh_kb_result_confirm = /** @type {(inputs: Kb_Result_ConfirmInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认`)
};

/**
* | output |
* | --- |
* | "Confirm" |
*
* @param {Kb_Result_ConfirmInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_result_confirm = /** @type {((inputs?: Kb_Result_ConfirmInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Result_ConfirmInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_result_confirm(inputs)
	return zh_kb_result_confirm(inputs)
});