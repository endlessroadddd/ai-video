/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_Magic_Link_Sent_HintInputs */

const en_auth_magic_link_sent_hint = /** @type {(inputs: Auth_Magic_Link_Sent_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Click the link in the email to sign in.`)
};

const zh_auth_magic_link_sent_hint = /** @type {(inputs: Auth_Magic_Link_Sent_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请点击邮件中的链接登录。`)
};

/**
* | output |
* | --- |
* | "Click the link in the email to sign in." |
*
* @param {Auth_Magic_Link_Sent_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_magic_link_sent_hint = /** @type {((inputs?: Auth_Magic_Link_Sent_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Magic_Link_Sent_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_magic_link_sent_hint(inputs)
	return zh_auth_magic_link_sent_hint(inputs)
});