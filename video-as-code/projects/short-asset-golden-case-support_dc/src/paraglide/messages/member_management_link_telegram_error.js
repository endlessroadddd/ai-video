/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Link_Telegram_ErrorInputs */

const en_member_management_link_telegram_error = /** @type {(inputs: Member_Management_Link_Telegram_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to link Telegram account.`)
};

const zh_member_management_link_telegram_error = /** @type {(inputs: Member_Management_Link_Telegram_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`绑定 Telegram 账号失败。`)
};

/**
* | output |
* | --- |
* | "Failed to link Telegram account." |
*
* @param {Member_Management_Link_Telegram_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_link_telegram_error = /** @type {((inputs?: Member_Management_Link_Telegram_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Link_Telegram_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_link_telegram_error(inputs)
	return zh_member_management_link_telegram_error(inputs)
});