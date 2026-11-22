/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Platform_TelegramInputs */

const en_platform_telegram = /** @type {(inputs: Platform_TelegramInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram`)
};

const zh_platform_telegram = /** @type {(inputs: Platform_TelegramInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram`)
};

/**
* | output |
* | --- |
* | "Telegram" |
*
* @param {Platform_TelegramInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const platform_telegram = /** @type {((inputs?: Platform_TelegramInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Platform_TelegramInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_platform_telegram(inputs)
	return zh_platform_telegram(inputs)
});