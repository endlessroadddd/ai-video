/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Draft_BadgeInputs */

const en_client_chat_draft_badge = /** @type {(inputs: Client_Chat_Draft_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Draft`)
};

const zh_client_chat_draft_badge = /** @type {(inputs: Client_Chat_Draft_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`草稿`)
};

/**
* | output |
* | --- |
* | "Draft" |
*
* @param {Client_Chat_Draft_BadgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_draft_badge = /** @type {((inputs?: Client_Chat_Draft_BadgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Draft_BadgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_draft_badge(inputs)
	return zh_client_chat_draft_badge(inputs)
});