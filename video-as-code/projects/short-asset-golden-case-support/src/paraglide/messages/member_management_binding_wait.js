/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Binding_WaitInputs */

const en_member_management_binding_wait = /** @type {(inputs: Member_Management_Binding_WaitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Verifying and linking the account. Please wait...`)
};

const zh_member_management_binding_wait = /** @type {(inputs: Member_Management_Binding_WaitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在校验并绑定账号，请稍候...`)
};

/**
* | output |
* | --- |
* | "Verifying and linking the account. Please wait..." |
*
* @param {Member_Management_Binding_WaitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_binding_wait = /** @type {((inputs?: Member_Management_Binding_WaitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Binding_WaitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_binding_wait(inputs)
	return zh_member_management_binding_wait(inputs)
});