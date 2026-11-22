/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Telegram_UnavailableInputs */

const en_member_management_telegram_unavailable = /** @type {(inputs: Member_Management_Telegram_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram account linking is not enabled in the current environment.`)
};

const zh_member_management_telegram_unavailable = /** @type {(inputs: Member_Management_Telegram_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前环境未启用 Telegram 账号绑定。`)
};

/**
* | output |
* | --- |
* | "Telegram account linking is not enabled in the current environment." |
*
* @param {Member_Management_Telegram_UnavailableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_telegram_unavailable = /** @type {((inputs?: Member_Management_Telegram_UnavailableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Telegram_UnavailableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_telegram_unavailable(inputs)
	return zh_member_management_telegram_unavailable(inputs)
});