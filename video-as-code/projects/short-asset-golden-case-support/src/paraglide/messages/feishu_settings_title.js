/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Settings_TitleInputs */

const en_feishu_settings_title = /** @type {(inputs: Feishu_Settings_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu`)
};

const zh_feishu_settings_title = /** @type {(inputs: Feishu_Settings_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`飞书`)
};

/**
* | output |
* | --- |
* | "Feishu" |
*
* @param {Feishu_Settings_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_settings_title = /** @type {((inputs?: Feishu_Settings_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Settings_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_settings_title(inputs)
	return zh_feishu_settings_title(inputs)
});