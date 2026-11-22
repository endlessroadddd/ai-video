/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Empty_Without_CompanyInputs */

const en_telegram_settings_empty_without_company = /** @type {(inputs: Telegram_Settings_Empty_Without_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company first, then add a community.`)
};

const zh_telegram_settings_empty_without_company = /** @type {(inputs: Telegram_Settings_Empty_Without_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先选择公司后再添加社区。`)
};

/**
* | output |
* | --- |
* | "Please select a company first, then add a community." |
*
* @param {Telegram_Settings_Empty_Without_CompanyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_empty_without_company = /** @type {((inputs?: Telegram_Settings_Empty_Without_CompanyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Empty_Without_CompanyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_empty_without_company(inputs)
	return zh_telegram_settings_empty_without_company(inputs)
});