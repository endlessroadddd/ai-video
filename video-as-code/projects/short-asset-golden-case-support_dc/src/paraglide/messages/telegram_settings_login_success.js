/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Login_SuccessInputs */

const en_telegram_settings_login_success = /** @type {(inputs: Telegram_Settings_Login_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Signed in successfully. Continue by adding the bot to the target community.`)
};

const zh_telegram_settings_login_success = /** @type {(inputs: Telegram_Settings_Login_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`登录成功，请继续将 bot 添加到目标社区。`)
};

/**
* | output |
* | --- |
* | "Signed in successfully. Continue by adding the bot to the target community." |
*
* @param {Telegram_Settings_Login_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_login_success = /** @type {((inputs?: Telegram_Settings_Login_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Login_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_login_success(inputs)
	return zh_telegram_settings_login_success(inputs)
});