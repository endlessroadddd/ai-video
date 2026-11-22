/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ platform: NonNullable<unknown> }} Integration_Dialog_TitleInputs */

const en_integration_dialog_title = /** @type {(inputs: Integration_Dialog_TitleInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Add ${i?.platform} Community`)
};

const zh_integration_dialog_title = /** @type {(inputs: Integration_Dialog_TitleInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`添加 ${i?.platform} 社区`)
};

/**
* | output |
* | --- |
* | "Add {platform} Community" |
*
* @param {Integration_Dialog_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_dialog_title = /** @type {((inputs: Integration_Dialog_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Dialog_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_dialog_title(inputs)
	return zh_integration_dialog_title(inputs)
});