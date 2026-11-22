/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_UpdatingInputs */

const en_ul_updating = /** @type {(inputs: Ul_UpdatingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Updating`)
};

const zh_ul_updating = /** @type {(inputs: Ul_UpdatingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新中`)
};

/**
* | output |
* | --- |
* | "Updating" |
*
* @param {Ul_UpdatingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_updating = /** @type {((inputs?: Ul_UpdatingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_UpdatingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_updating(inputs)
	return zh_ul_updating(inputs)
});