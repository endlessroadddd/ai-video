/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_Get_Magic_LinkInputs */

const en_auth_get_magic_link = /** @type {(inputs: Auth_Get_Magic_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Get sign-in link`)
};

const zh_auth_get_magic_link = /** @type {(inputs: Auth_Get_Magic_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`获取登录链接`)
};

/**
* | output |
* | --- |
* | "Get sign-in link" |
*
* @param {Auth_Get_Magic_LinkInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_get_magic_link = /** @type {((inputs?: Auth_Get_Magic_LinkInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Get_Magic_LinkInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_get_magic_link(inputs)
	return zh_auth_get_magic_link(inputs)
});