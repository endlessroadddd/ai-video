/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_Next_StepInputs */

const en_common_next_step = /** @type {(inputs: Common_Next_StepInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next`)
};

const zh_common_next_step = /** @type {(inputs: Common_Next_StepInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一步`)
};

/**
* | output |
* | --- |
* | "Next" |
*
* @param {Common_Next_StepInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_next_step = /** @type {((inputs?: Common_Next_StepInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Next_StepInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_common_next_step(inputs)
	return zh_common_next_step(inputs)
});