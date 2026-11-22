/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Select_Company_TopInputs */

const en_telegram_settings_select_company_top = /** @type {(inputs: Telegram_Settings_Select_Company_TopInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please choose the company to bind at the top first.`)
};

const zh_telegram_settings_select_company_top = /** @type {(inputs: Telegram_Settings_Select_Company_TopInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先在顶部选择要绑定的公司。`)
};

/**
* | output |
* | --- |
* | "Please choose the company to bind at the top first." |
*
* @param {Telegram_Settings_Select_Company_TopInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_select_company_top = /** @type {((inputs?: Telegram_Settings_Select_Company_TopInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Select_Company_TopInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_select_company_top(inputs)
	return zh_telegram_settings_select_company_top(inputs)
});