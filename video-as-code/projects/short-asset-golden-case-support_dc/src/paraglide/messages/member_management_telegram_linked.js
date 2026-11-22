/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Telegram_LinkedInputs */

const en_member_management_telegram_linked = /** @type {(inputs: Member_Management_Telegram_LinkedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram account linked.`)
};

const zh_member_management_telegram_linked = /** @type {(inputs: Member_Management_Telegram_LinkedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已绑定 Telegram 账号。`)
};

/**
* | output |
* | --- |
* | "Telegram account linked." |
*
* @param {Member_Management_Telegram_LinkedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_telegram_linked = /** @type {((inputs?: Member_Management_Telegram_LinkedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Telegram_LinkedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_telegram_linked(inputs)
	return zh_member_management_telegram_linked(inputs)
});