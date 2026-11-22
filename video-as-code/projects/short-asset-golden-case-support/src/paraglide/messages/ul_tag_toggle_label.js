/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Toggle_LabelInputs */

const en_ul_tag_toggle_label = /** @type {(inputs: Ul_Tag_Toggle_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enabled`)
};

const zh_ul_tag_toggle_label = /** @type {(inputs: Ul_Tag_Toggle_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`启用状态`)
};

/**
* | output |
* | --- |
* | "Enabled" |
*
* @param {Ul_Tag_Toggle_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_toggle_label = /** @type {((inputs?: Ul_Tag_Toggle_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Toggle_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_toggle_label(inputs)
	return zh_ul_tag_toggle_label(inputs)
});