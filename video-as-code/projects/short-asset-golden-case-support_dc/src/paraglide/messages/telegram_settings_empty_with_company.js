/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Empty_With_CompanyInputs */

const en_telegram_settings_empty_with_company = /** @type {(inputs: Telegram_Settings_Empty_With_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No communities yet. Click Add Community in the top-right.`)
};

const zh_telegram_settings_empty_with_company = /** @type {(inputs: Telegram_Settings_Empty_With_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无社区，点击右上角添加社区。`)
};

/**
* | output |
* | --- |
* | "No communities yet. Click Add Community in the top-right." |
*
* @param {Telegram_Settings_Empty_With_CompanyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_empty_with_company = /** @type {((inputs?: Telegram_Settings_Empty_With_CompanyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Empty_With_CompanyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_empty_with_company(inputs)
	return zh_telegram_settings_empty_with_company(inputs)
});