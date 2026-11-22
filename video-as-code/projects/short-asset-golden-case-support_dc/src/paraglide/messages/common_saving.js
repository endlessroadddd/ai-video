/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_SavingInputs */

const en_common_saving = /** @type {(inputs: Common_SavingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saving...`)
};

const zh_common_saving = /** @type {(inputs: Common_SavingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存中...`)
};

/**
* | output |
* | --- |
* | "Saving..." |
*
* @param {Common_SavingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const common_saving = /** @type {((inputs?: Common_SavingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_SavingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_common_saving(inputs)
	return zh_common_saving(inputs)
});