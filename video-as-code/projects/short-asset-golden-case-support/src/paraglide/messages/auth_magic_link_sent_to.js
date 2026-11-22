/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ email: NonNullable<unknown> }} Auth_Magic_Link_Sent_ToInputs */

const en_auth_magic_link_sent_to = /** @type {(inputs: Auth_Magic_Link_Sent_ToInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Email sent to: ${i?.email}`)
};

const zh_auth_magic_link_sent_to = /** @type {(inputs: Auth_Magic_Link_Sent_ToInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已发送邮件到：${i?.email}`)
};

/**
* | output |
* | --- |
* | "Email sent to: {email}" |
*
* @param {Auth_Magic_Link_Sent_ToInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_magic_link_sent_to = /** @type {((inputs: Auth_Magic_Link_Sent_ToInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Magic_Link_Sent_ToInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_magic_link_sent_to(inputs)
	return zh_auth_magic_link_sent_to(inputs)
});