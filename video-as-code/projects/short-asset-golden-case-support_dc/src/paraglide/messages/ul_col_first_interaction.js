/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Col_First_InteractionInputs */

const en_ul_col_first_interaction = /** @type {(inputs: Ul_Col_First_InteractionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`First Interaction`)
};

const zh_ul_col_first_interaction = /** @type {(inputs: Ul_Col_First_InteractionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`首次互动`)
};

/**
* | output |
* | --- |
* | "First Interaction" |
*
* @param {Ul_Col_First_InteractionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_col_first_interaction = /** @type {((inputs?: Ul_Col_First_InteractionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Col_First_InteractionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_col_first_interaction(inputs)
	return zh_ul_col_first_interaction(inputs)
});