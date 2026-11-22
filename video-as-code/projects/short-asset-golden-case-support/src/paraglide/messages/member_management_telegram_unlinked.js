/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Telegram_UnlinkedInputs */

const en_member_management_telegram_unlinked = /** @type {(inputs: Member_Management_Telegram_UnlinkedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram account not linked.`)
};

const zh_member_management_telegram_unlinked = /** @type {(inputs: Member_Management_Telegram_UnlinkedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未绑定 Telegram 账号。`)
};

/**
* | output |
* | --- |
* | "Telegram account not linked." |
*
* @param {Member_Management_Telegram_UnlinkedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_telegram_unlinked = /** @type {((inputs?: Member_Management_Telegram_UnlinkedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Telegram_UnlinkedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_telegram_unlinked(inputs)
	return zh_member_management_telegram_unlinked(inputs)
});